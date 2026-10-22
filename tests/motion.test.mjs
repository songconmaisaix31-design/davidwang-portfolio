import test from 'node:test';
import assert from 'node:assert/strict';
import { getHeroMotion } from '../dist/hero-orbit.js';
import { initGlassSculptures } from '../dist/glass-sculpture.js';

class Element extends EventTarget {
  attrs=new Map(); children=new Map(); hidden=false; open=false; style={}; dataset={}; reads=0;
  classList={contains:()=>false,add:()=>{},remove:()=>{}};
  querySelector(selector) {return this.children.get(selector)||null;}
  toggleAttribute(key,on) {if(on)this.attrs.set(key,'');else this.attrs.delete(key);}
  setAttribute(key,value) {this.attrs.set(key,value);}
  getBoundingClientRect() {this.reads++;return {left:0,top:0,width:1000,height:500};}
}
function emit(target,type,detail) {
  const event=new Event(type);Object.assign(event,detail);target.dispatchEvent(event);
}
function environment() {
  const doc=new Element(),media=new Map(),queue=new Map(),observers=[];
  let id=0;
  doc.documentElement=new Element();doc.body=new Element();doc.hidden=false;
  globalThis.document=doc;
  globalThis.window=globalThis;
  globalThis.devicePixelRatio=2;
  globalThis.CustomEvent=class extends Event {constructor(type,options){super(type);this.detail=options.detail;}};
  globalThis.matchMedia=query=>{
    if(!media.has(query)) {const match=new Element();match.matches=query.includes('pointer');media.set(query,match);}
    return media.get(query);
  };
  globalThis.requestAnimationFrame=callback=>{queue.set(++id,callback);return id;};
  globalThis.cancelAnimationFrame=id=>queue.delete(id);
  globalThis.IntersectionObserver=class {
    targets=new Set();
    constructor(callback,options){this.callback=callback;this.options=options;observers.push(this);}
    observe(target){this.targets.add(target);}
    unobserve(target){this.targets.delete(target);}
  };
  globalThis.ResizeObserver=class {observe(){}};
  globalThis.MutationObserver=class {observe(){}};
  return {
    doc,queue,media,observers,
    step(now){const pending=[...queue.values()];queue.clear();pending.forEach(callback=>callback(now));},
    intersect(target,isIntersecting){
      for(const observer of [...observers]) if(observer.targets.has(target)) observer.callback([{target,isIntersecting}]);
    },
    dialog(open){doc.dispatchEvent(new CustomEvent('portfolio:dialog',{detail:{open}}));}
  };
}

for(const hz of [60,100,120,144]) test(`hero consumes every ${hz} Hz callback with consistent speed and damping`,()=>{
  const env=environment(),section=new Element(),driver=getHeroMotion(section);
  let renders=0;driver.subscribe(()=>renders++);renders=0;
  env.step(0);
  for(let i=0;i<20;i++) emit(section,'pointermove',{clientX:1000,clientY:500});
  assert.equal(section.reads,0,'pointer events must not force layout');
  for(let i=1;i<=hz;i++) env.step(i*1000/hz);
  assert.equal(renders,hz+1,'no artificial 30 FPS frame skipping');
  assert.ok(Math.abs(driver.state.time-1)<1e-10);
  assert.ok(Math.abs(driver.state.pointerX-(1-Math.pow(.955,30)))<1e-10);
  assert.equal(section.reads,1,'coalesce pointer samples before drawing');
  env.dialog(true);assert.equal(env.queue.size,0);
  const before=driver.state.time;
  env.dialog(false);env.step(10000);
  assert.equal(driver.state.time,before,'resume must not jump forward');
  env.step(10000+1000/hz);assert.ok(driver.state.time>before);
  env.intersect(section,false);assert.equal(env.queue.size,0);
  env.intersect(section,true);assert.equal(env.queue.size,1);
  env.doc.hidden=true;emit(env.doc,'visibilitychange',{});assert.equal(env.queue.size,0);
  env.doc.hidden=false;emit(env.doc,'visibilitychange',{});assert.equal(env.queue.size,1);
  const reduced=env.media.get('(prefers-reduced-motion: reduce)');
  reduced.matches=true;emit(reduced,'change',{});assert.equal(env.queue.size,0);
  assert.equal(driver.state.reduced,true);
});

function glassEnvironment(webgl=true) {
  const env=environment(),section=new Element(),host=new Element(),canvas=new Element(),control=new Element();
  const calls=[],uniforms=new Map();let contexts=0;
  const gl=new Proxy({}, {get:(_,key)=>{
    if(key==='getShaderParameter'||key==='getProgramParameter') return ()=>true;
    if(key==='getUniformLocation') return (_,name)=>name;
    if(key==='getAttribLocation') return ()=>0;
    if(key==='uniform1f') return (name,value)=>uniforms.set(name,value);
    if(key.startsWith('create')) return ()=>({});
    if(key.toUpperCase()===key) return 1;
    return (...args)=>calls.push([key,...args]);
  }});
  section.children.set('[data-glass-toggle]',control);
  host.closest=()=>section;canvas.closest=()=>host;
  canvas.getContext=()=>{contexts++;return webgl?gl:null;};
  env.doc.querySelectorAll=()=>[canvas];
  initGlassSculptures();
  return {...env,section,host,canvas,control,calls,uniforms,contexts:()=>contexts};
}
for(const hz of [60,100,120,144]) test(`glass is lazy, renders each ${hz} Hz frame and pauses correctly`,()=>{
  const env=glassEnvironment();
  assert.equal(env.contexts(),0,'offscreen startup must not compile WebGL');
  env.intersect(env.canvas,true);assert.equal(env.contexts(),1);
  env.intersect(env.host,true);env.calls.length=0;
  const initialReads=env.host.reads;
  for(let i=0;i<20;i++) emit(env.section,'pointermove',{clientX:1000,clientY:500});
  assert.equal(env.host.reads,initialReads);
  for(let i=0;i<=hz;i++) env.step(i*1000/hz);
  assert.equal(env.calls.filter(call=>call[0]==='drawElements').length,(hz+1)*2);
  assert.equal(env.calls.filter(call=>call[0]==='bindBuffer').length,0,'bindings persist between frames');
  assert.ok(Math.abs(env.uniforms.get('uTime')-1)<1e-10);
  const pointer=env.calls.filter(call=>call[0]==='uniform2f'&&call[1]==='uPointer').at(-1);
  assert.ok(Math.abs(pointer[2]-(1-Math.pow(.955,30)))<1e-10);
  assert.equal(env.host.reads,initialReads+1);
  env.dialog(true);assert.equal(env.queue.size,0);
  env.dialog(false);env.step(10000);assert.ok(Math.abs(env.uniforms.get('uTime')-1)<1e-10);
  emit(env.control,'click',{});assert.equal(env.queue.size,0);
  assert.equal(env.control.attrs.get('aria-pressed'),'true');
  emit(env.control,'click',{});assert.equal(env.queue.size,1);
  env.intersect(env.host,false);assert.equal(env.queue.size,0);
  env.intersect(env.host,true);assert.equal(env.queue.size,1);
  env.doc.hidden=true;emit(env.doc,'visibilitychange',{});assert.equal(env.queue.size,0);
  env.doc.hidden=false;emit(env.doc,'visibilitychange',{});assert.equal(env.queue.size,1);
  const reduced=env.media.get('(prefers-reduced-motion: reduce)');
  reduced.matches=true;emit(reduced,'change',{});assert.equal(env.queue.size,0);
  reduced.matches=false;emit(reduced,'change',{});assert.equal(env.queue.size,1);
  emit(env.canvas,'webglcontextlost',{});assert.equal(env.queue.size,0);
});
test('unavailable WebGL retains the static fallback without scheduling animation',()=>{
  const env=glassEnvironment(false);env.intersect(env.canvas,true);
  assert.equal(env.contexts(),1);assert.equal(env.queue.size,0);
});
