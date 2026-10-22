import test from 'node:test';
import assert from 'node:assert/strict';
import { createProjectPreviews } from '../dist/project-preview.js';
import { projectCard, livePreviewFor } from '../dist/render-content.js';
import { portfolio } from '../dist/content.js';
const previewUrl=portfolio.projects.find(x=>x.id==='crewtrace').livePreview;

class Element extends EventTarget {
  attrs=new Map();classes=new Set();style={};children=[];dataset={};
  classList={add:name=>this.classes.add(name),remove:name=>this.classes.delete(name)};
  setAttribute(key,value){this.attrs.set(key,value);}
  append(child){this.children.push(child);child.parent=this;}
  remove(){this.parent.children=this.parent.children.filter(x=>x!==this);}
  getBoundingClientRect(){return {width:640};}
}
function setup(reduce=false) {
  const doc=new Element(),reduced=new Element();
  const intersections=[],resizes=[];
  reduced.matches=reduce;doc.hidden=false;doc.querySelector=()=>null;
  doc.createElement=()=>new Element();
  globalThis.document=doc;globalThis.window=globalThis;globalThis.matchMedia=()=>reduced;
  globalThis.IntersectionObserver=class{
    constructor(callback){this.callback=callback;this.targets=new Set();intersections.push(this);}
    observe(target){this.targets.add(target);}
    unobserve(target){this.targets.delete(target);}
  };
  globalThis.ResizeObserver=class{
    constructor(callback){this.callback=callback;this.targets=new Set();resizes.push(this);}
    observe(target){this.targets.add(target);}
    unobserve(target){this.targets.delete(target);}
  };
  function host(full=false) {
    const element=new Element(),surface=new Element(),button=new Element();
    element.dataset={previewUrl,previewName:'CrewTrace',previewMode:full?'full':'card'};
    element.querySelector=selector=>selector==='.preview-surface'?surface:button;
    return {element,surface,button};
  }
  function root(...items){return {querySelectorAll:()=>items.map(x=>x.element),contains:el=>items.some(x=>x.element===el)};}
  return {doc,reduced,intersections,resizes,host,root,
    visible(item,on){intersections[0].callback([{target:item.element,isIntersecting:on}]);},
    dialog(open){const event=new Event('portfolio:dialog');event.detail={open};doc.dispatchEvent(event);}
  };
}
test('preview creates one isolated frame only while visible and releases it across modal and filter changes',()=>{
  const env=setup(),controller=createProjectPreviews(),card=env.host(),full=env.host(true);
  const cards=env.root(card),dialog=env.root(full);
  controller.observe(cards);controller.observe(cards);
  assert.equal(card.surface.children.length,0);
  assert.equal(env.intersections[0].targets.size,1);
  env.visible(card,true);assert.equal(card.surface.children.length,1);
  const frame=card.surface.children[0];
  assert.equal(frame.src,previewUrl);
  assert.equal(frame.tabIndex,-1);
  assert.equal(frame.attrs.get('sandbox'),'allow-scripts allow-same-origin');
  frame.dispatchEvent(new Event('load'));assert.equal(card.element.classes.has('preview-loaded'),true);
  env.visible(card,false);assert.equal(card.surface.children.length,0);
  assert.equal(card.element.classes.has('preview-loaded'),false);
  env.visible(card,true);env.doc.hidden=true;env.doc.dispatchEvent(new Event('visibilitychange'));
  assert.equal(card.surface.children.length,0);
  env.doc.hidden=false;env.doc.dispatchEvent(new Event('visibilitychange'));
  assert.equal(card.surface.children.length,1);
  card.button.dispatchEvent(new Event('click'));assert.equal(card.surface.children.length,0);
  env.visible(card,false);env.visible(card,true);assert.equal(card.surface.children.length,0);
  card.button.dispatchEvent(new Event('click'));assert.equal(card.surface.children.length,1);
  env.dialog(true);assert.equal(card.surface.children.length,0);
  controller.observe(dialog);env.visible(full,true);assert.equal(full.surface.children.length,1);
  assert.equal(full.surface.children[0].attrs.has('aria-hidden'),false);
  controller.release(dialog);env.dialog(false);
  assert.equal(full.surface.children.length,0);assert.equal(card.surface.children.length,1);
  controller.release(cards);assert.equal(card.surface.children.length,0);
  assert.equal(env.intersections[0].targets.size,0);assert.equal(env.resizes[0].targets.size,0);
});
test('reduced motion leaves the original poster until the visitor explicitly starts the preview',()=>{
  const env=setup(true),controller=createProjectPreviews(),card=env.host();
  controller.observe(env.root(card));env.visible(card,true);
  assert.equal(card.surface.children.length,0);
  card.button.dispatchEvent(new Event('click'));assert.equal(card.surface.children.length,1);
  env.reduced.dispatchEvent(new Event('change'));assert.equal(card.surface.children.length,0);
});
test('static markup keeps an accessible project opener and does not load an iframe before visibility checks',()=>{
  const project=portfolio.projects.find(x=>x.id==='crewtrace');
  const card=projectCard(project,0);
  assert.ok(card.includes(`data-preview-url="${previewUrl}"`));
  assert.match(card,/aria-label="查看 CrewTrace 项目详情与完整网站"/);
  assert.ok(!card.includes('<iframe'));
  assert.ok(card.includes(project.asset));
  assert.ok(!livePreviewFor({...project,livePreview:'javascript:alert(1)'}));
});
