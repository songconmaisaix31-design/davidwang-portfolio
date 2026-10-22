// Glass material for the infinity sculpture in the principles section.
export const GLASS_VERTEX_SHADER = `
precision highp float;
attribute vec2 aParam;
uniform float uTime;
uniform vec2 uScale;
uniform vec2 uPointer;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vEdge;

mat3 rotateX(float a) { float c=cos(a),s=sin(a); return mat3(1.,0.,0.,0.,c,s,0.,-s,c); }
mat3 rotateY(float a) { float c=cos(a),s=sin(a); return mat3(c,0.,-s,0.,1.,0.,s,0.,c); }
mat3 rotateZ(float a) { float c=cos(a),s=sin(a); return mat3(c,s,0.,-s,c,0.,0.,0.,1.); }

vec3 ribbon(vec2 uv) {
  float u=uv.x, v=uv.y;
  vec3 center=vec3(sin(u),.365*sin(2.*u),.17*cos(u));
  vec3 tangent=normalize(vec3(cos(u),.73*cos(2.*u),-.17*sin(u)));
  float width=.115, thickness=.028;
  float twist=.5*u-.3+.22*sin(uTime*.19);
  vec3 across=normalize(vec3(-tangent.y,tangent.x,0.));
  vec3 up=normalize(cross(tangent,across));
  vec3 wide=across*cos(twist)+up*sin(twist);
  vec3 thin=-across*sin(twist)+up*cos(twist);
  return center+wide*(width*cos(v))+thin*(thickness*sin(v));
}
void main() {
  vec3 p=ribbon(aParam);
  vec3 du=ribbon(aParam+vec2(.001,0.))-ribbon(aParam-vec2(.001,0.));
  vec3 dv=ribbon(aParam+vec2(0.,.002))-ribbon(aParam-vec2(0.,.002));
  float yaw=.075*sin(uTime*.13)+uPointer.x*.035;
  float pitch=.13+.06*sin(uTime*.17)+uPointer.y*.025;
  float roll=-.035+.025*sin(uTime*.14);
  mat3 model=rotateY(yaw)*rotateX(pitch)*rotateZ(roll);
  vPosition=model*p;
  vNormal=normalize(model*normalize(cross(du,dv)));
  vEdge=abs(cos(aParam.y));
  gl_Position=vec4(vPosition.xy*uScale,-vPosition.z*.25,1.);
}`;

export const GLASS_FRAGMENT_SHADER = `
precision highp float;
uniform float uDark;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vEdge;

float softBox(vec3 direction, vec3 axis, vec3 longAxis, float width, float height) {
  vec3 r=normalize(direction), n=normalize(axis);
  vec3 a=normalize(longAxis-n*dot(longAxis,n)), b=cross(n,a);
  float facing=max(dot(r,n),0.);
  float x=dot(r,a), y=dot(r,b);
  return (1.-smoothstep(width*.7,width,abs(x)))*(1.-smoothstep(height*.83,height,abs(y)))*smoothstep(.6,.92,facing);
}
vec3 backdrop(vec3 ray) {
  float cool=smoothstep(-.8,.6,ray.x+ray.y*.4);
  vec3 light=mix(vec3(.93,.95,.975),vec3(.84,.91,.94),cool*.35);
  vec3 dark=mix(vec3(.055,.075,.105),vec3(.095,.13,.18),cool*.5);
  return mix(light,dark,uDark);
}
void main() {
  vec3 V=vec3(0.,0.,1.);
  vec3 N=normalize(vNormal);
  if(dot(N,V)<0.) N=-N;
  float nv=clamp(dot(N,V),0.,1.);
  float fresnel=.038+.962*pow(1.-nv,5.);
  vec3 reflection=reflect(-V,N);
  vec3 transmission=refract(-V,N,1./1.46);
  float stripA=softBox(reflection,vec3(-.48,.64,.78),vec3(.35,1.,-.2),.045,.83);
  float stripB=softBox(reflection,vec3(.77,.12,.65),vec3(.1,1.,.12),.07,.62);
  float ceiling=pow(max(dot(reflection,normalize(vec3(-.2,.87,.45))),0.),16.);
  float darkStrip=softBox(reflection,vec3(.38,-.2,.9),vec3(-.3,1.,.1),.115,.95);
  float windowShade=softBox(reflection,vec3(.15,.19,.97),vec3(1.,-.4,.1),.56,.20);
  darkStrip=max(darkStrip,windowShade*.8);
  float light=clamp(stripA+stripB*.72+ceiling*.26,0.,1.);
  vec3 edge=mix(vec3(.24,.32,.41),vec3(.39,.53,.65),uDark);
  vec3 environment=mix(edge,vec3(1.),light);
  environment=mix(environment,mix(vec3(.085,.13,.19),vec3(.2,.3,.4),uDark),darkStrip*.7);
  // Small chromatic separation at glancing angles, clear transmission across the face.
  vec3 transmitted=backdrop(transmission);
  transmitted.r=backdrop(refract(-V,N,1./1.448)).r;
  transmitted.b=backdrop(refract(-V,N,1./1.465)).b;
  float opticalEdge=smoothstep(.55,1.,vEdge)*.28;
  float reflectionWeight=clamp(fresnel*.88+opticalEdge+light*.28+darkStrip*.62,0.,.94);
  vec3 color=mix(transmitted,environment,reflectionWeight);
  color=mix(color,vec3(1.),light*.72);
  float alpha=clamp(.055+fresnel*.57+opticalEdge*.55+light*.58+darkStrip*.36,.04,.9);
  // A restrained cool absorption line defines the polished lens-like edge.
  color=mix(color,mix(vec3(.31,.46,.58),vec3(.62,.78,.86),uDark),opticalEdge*.32);
  gl_FragColor=vec4(color,alpha);
}`;

export function createGlassMesh(longitudinal=240,crossSection=32) {
  const parameters=new Float32Array((longitudinal+1)*(crossSection+1)*2);
  const indices=new Uint16Array(longitudinal*crossSection*6);
  let p=0,k=0;
  for(let i=0;i<=longitudinal;i++) for(let j=0;j<=crossSection;j++) {
    parameters[p++]=i/longitudinal*Math.PI*2;
    parameters[p++]=j/crossSection*Math.PI*2;
  }
  for(let i=0;i<longitudinal;i++) for(let j=0;j<crossSection;j++) {
    const a=i*(crossSection+1)+j,b=a+crossSection+1;
    indices[k++]=a; indices[k++]=b; indices[k++]=a+1;
    indices[k++]=b; indices[k++]=b+1; indices[k++]=a+1;
  }
  return {parameters,indices};
}

const PAUSE_ICON='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>';
const PLAY_ICON='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z"/></svg>';

function mountGlass(canvas) {
  const host=canvas.closest('[data-glass-scene]');
  const section=host?.closest('section');
  const control=section?.querySelector('[data-glass-toggle]');
  if(!host||!section) return;
  const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:true,powerPreference:'high-performance'});
  if(!gl) return;
  let program,vertex,index,mesh;
  try {
    const shaders=[gl.VERTEX_SHADER,gl.FRAGMENT_SHADER].map((type,i)=>{
      const shader=gl.createShader(type);
      gl.shaderSource(shader,i===0?GLASS_VERTEX_SHADER:GLASS_FRAGMENT_SHADER);
      gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) { gl.deleteShader(shader); throw new Error('Glass shader unavailable'); }
      return shader;
    });
    program=gl.createProgram();
    shaders.forEach(shader=>gl.attachShader(program,shader));
    gl.linkProgram(program);
    shaders.forEach(shader=>gl.deleteShader(shader));
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error('Glass renderer unavailable');
    mesh=createGlassMesh();
    vertex=gl.createBuffer(); index=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertex); gl.bufferData(gl.ARRAY_BUFFER,mesh.parameters,gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,mesh.indices,gl.STATIC_DRAW);
  } catch { if(program) gl.deleteProgram(program); return; }
  const loc=Object.fromEntries(['uTime','uScale','uPointer','uDark'].map(key=>[key,gl.getUniformLocation(program,key)]));
  const attribute=gl.getAttribLocation(program,'aParam');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(pointer: fine)');
  let inView=false,manualPause=false,lost=false,frame=0,last=null,elapsed=0,width=0,height=0;
  let targetX=0,targetY=0,pointerX=0,pointerY=0;
  let pendingPointer=null,dialogOpen=Boolean(document.querySelector('#detail-dialog')?.open);
  let welcome=document.documentElement.classList.contains('welcome-active');
  let dark=document.body.dataset.theme==='dark'?1:0;
  // This canvas owns its context; buffer bindings and fixed state persist between frames.
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER,vertex);gl.enableVertexAttribArray(attribute);
  gl.vertexAttribPointer(attribute,2,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index);
  gl.uniform2f(loc.uScale,.84,1.54);
  gl.disable(gl.CULL_FACE);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
  gl.clearColor(0,0,0,0);gl.clearDepth(1);
  gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
  function paused() { return manualPause||reduced.matches||document.hidden||!inView||lost||dialogOpen||welcome; }
  function draw() {
    if(lost||!width||!height) return;
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.uniform1f(loc.uTime,elapsed);
    gl.uniform1f(loc.uDark,dark);
    gl.uniform2f(loc.uPointer,pointerX,pointerY);
    // Resolve the nearest glass surface first so the infinity crossing stays clean.
    gl.disable(gl.BLEND); gl.colorMask(false,false,false,false); gl.depthMask(true);
    gl.drawElements(gl.TRIANGLES,mesh.indices.length,gl.UNSIGNED_SHORT,0);
    gl.colorMask(true,true,true,true); gl.depthMask(false); gl.enable(gl.BLEND);
    gl.drawElements(gl.TRIANGLES,mesh.indices.length,gl.UNSIGNED_SHORT,0);
    gl.depthMask(true);
  }
  function tick(now) {
    frame=0;
    if(paused()) {last=null;return;}
    const dt=last===null?0:Math.min((now-last)/1000,.1);
    elapsed+=dt;last=now;
    if(pendingPointer) {
      const rect=host.getBoundingClientRect();
      targetX=Math.max(-1,Math.min(1,(pendingPointer.x-rect.left)/rect.width*2-1));
      targetY=Math.max(-1,Math.min(1,(pendingPointer.y-rect.top)/rect.height*2-1));
      pendingPointer=null;
    }
    const blend=1-Math.pow(1-.045,dt*30);
    pointerX+=(targetX-pointerX)*blend;pointerY+=(targetY-pointerY)*blend;
    draw();
    frame=requestAnimationFrame(tick);
  }
  function updateMotion() {
    section.toggleAttribute('data-glass-paused',paused());
    if(control) {
      control.hidden=reduced.matches||lost;
      control.setAttribute('aria-pressed',String(manualPause));
      const label=manualPause?'继续玻璃动效':'暂停玻璃动效';
      control.setAttribute('aria-label',label);control.title=label;
      control.innerHTML=manualPause?PLAY_ICON:PAUSE_ICON;
    }
    if(paused()) {
      if(frame)cancelAnimationFrame(frame);frame=0;last=null;pendingPointer=null;
      targetX=targetY=pointerX=pointerY=0;
      if(inView&&!document.hidden&&!dialogOpen&&!welcome) draw();
    } else if(!frame) frame=requestAnimationFrame(tick);
  }
  function resize() {
    const rect=host.getBoundingClientRect();
    const dpr=Math.min(devicePixelRatio||1,1.6);
    width=Math.max(1,Math.round(rect.width*dpr));height=Math.max(1,Math.round(rect.height*dpr));
    if(canvas.width!==width||canvas.height!==height) {
      canvas.width=width;canvas.height=height;gl.viewport(0,0,width,height);
    }
    draw();
  }
  new ResizeObserver(resize).observe(host);
  if('IntersectionObserver' in window) new IntersectionObserver(entries=>{
    inView=entries[0].isIntersecting;updateMotion();
  },{threshold:0}).observe(host);
  else inView=true;
  new MutationObserver(()=>{
    dark=document.body.dataset.theme==='dark'?1:0;
    if(inView&&!document.hidden&&!dialogOpen&&!welcome) draw();
  }).observe(document.body,{attributes:true,attributeFilter:['data-theme']});
  document.addEventListener('visibilitychange',updateMotion);
  document.addEventListener('portfolio:dialog',event=>{dialogOpen=event.detail.open;updateMotion();});
  document.addEventListener('welcome:state',event=>{welcome=event.detail.open;updateMotion();});
  reduced.addEventListener('change',updateMotion);
  fine.addEventListener('change',()=>{pendingPointer=null;targetX=targetY=0;});
  control?.addEventListener('click',()=>{manualPause=!manualPause;updateMotion();});
  section.addEventListener('pointermove',event=>{
    if(paused()||!fine.matches)return;
    pendingPointer={x:event.clientX,y:event.clientY};
  },{passive:true});
  section.addEventListener('pointerleave',()=>{pendingPointer=null;targetX=targetY=0;});
  canvas.addEventListener('webglcontextlost',event=>{
    event.preventDefault();lost=true;host.classList.remove('glass-ready');updateMotion();
  });
  resize();
  host.classList.add('glass-ready');
  updateMotion();
}

export function initGlassSculptures() {
  const mount=canvas=>{
    try {mountGlass(canvas);} catch {canvas.closest('[data-glass-scene]')?.classList.remove('glass-ready');}
  };
  const canvases=document.querySelectorAll('[data-glass-scene] canvas');
  if(!('IntersectionObserver' in window)) {canvases.forEach(mount);return;}
  // Compile WebGL only when the sculpture approaches the viewport.
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries) if(entry.isIntersecting) {
      observer.unobserve(entry.target);mount(entry.target);
    }
  },{rootMargin:'200px',threshold:0});
  canvases.forEach(canvas=>observer.observe(canvas));
}
