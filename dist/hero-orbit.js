// Three neighboring elliptical lanes form a drifting planetary belt.
export function planetPoint(u,lane=0,time=0,pointerX=0,pointerY=0) {
  const radiusX=.60+lane*.14, radiusY=.52+lane*.15;
  const tilt=-.10+.035*Math.sin(time*.08)+pointerX*.018;
  const x=radiusX*Math.cos(u), y=radiusY*Math.sin(u);
  return {
    x:x*Math.cos(tilt)-y*Math.sin(tilt),
    y:x*Math.sin(tilt)+y*Math.cos(tilt)+pointerY*.012,
    z:.30*Math.sin(u+.3)+lane*.035
  };
}

const drivers = new WeakMap();
export function getHeroMotion(section) {
  if (drivers.has(section)) return drivers.get(section);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(pointer:fine)');
  const pause=section.querySelector('#pause-tech');
  const listeners=new Set();
  const state={time:0,age:0,pointerX:0,pointerY:0,paused:false,reduced:reduced.matches};
  let manual=false,inView=true,hover=false,focus=false,frame=0,last=null,targetX=0,targetY=0;
  let pendingPointer=null,dialogOpen=Boolean(document.querySelector('#detail-dialog')?.open);
  let welcome=document.documentElement.classList.contains('welcome-active');
  const isPaused=()=>manual||reduced.matches||document.hidden||!inView||hover||focus||welcome||dialogOpen;
  function emit() { for (const listener of listeners) listener(state); }
  function tick(now) {
    frame=0;
    if (isPaused()) {last=null;return;}
    const dt=last===null?0:Math.min((now-last)/1000,.1);
    last=now;state.time+=dt;state.age+=dt;
    if(pendingPointer) {
      const rect=section.getBoundingClientRect();
      targetX=Math.max(-1,Math.min(1,(pendingPointer.x-rect.left)/rect.width*2-1));
      targetY=Math.max(-1,Math.min(1,(pendingPointer.y-rect.top)/rect.height*2-1));
      pendingPointer=null;
    }
    // Preserve the original damping at every display refresh rate.
    const blend=1-Math.pow(1-.045,dt*30);
    state.pointerX+=(targetX-state.pointerX)*blend;
    state.pointerY+=(targetY-state.pointerY)*blend;
    emit();
    frame=requestAnimationFrame(tick);
  }
  function update() {
    state.paused=isPaused();state.reduced=reduced.matches;
    section.toggleAttribute('data-orbit-paused',state.paused);
    if (pause) {
      pause.hidden=reduced.matches;
      pause.textContent=manual?'继续':'暂停';
      pause.setAttribute('aria-label',manual?'继续姓名与 Logo 动效':'暂停姓名与 Logo 动效');
      pause.setAttribute('aria-pressed',String(manual));
    }
    if (state.paused) {cancelAnimationFrame(frame);frame=0;last=null;pendingPointer=null;}
    else if (!frame) frame=requestAnimationFrame(tick);
    document.dispatchEvent(new CustomEvent('signature:pause',{detail:{paused:manual}}));
    emit();
  }
  pause?.addEventListener('click',()=>{manual=!manual;update();});
  document.addEventListener('welcome:state',event=>{
    welcome=event.detail.open;
    if(!welcome){state.time=0;state.age=0;targetX=targetY=0;manual=false;}
    update();
  });
  reduced.addEventListener('change',update);
  fine.addEventListener('change',()=>{pendingPointer=null;targetX=targetY=0;});
  document.addEventListener('portfolio:dialog',event=>{dialogOpen=event.detail.open;update();});
  document.addEventListener('visibilitychange',update);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries=>{
    inView=entries[0].isIntersecting;update();
  },{threshold:0}).observe(section);
  section.addEventListener('pointermove',e=>{
    if (!fine.matches || isPaused()) return;
    pendingPointer={x:e.clientX,y:e.clientY};
  },{passive:true});
  section.addEventListener('pointerleave',()=>{pendingPointer=null;targetX=targetY=0;});
  const field=section.querySelector('#tech-constellation');
  field?.addEventListener('pointerover',e=>{if(fine.matches&&e.target.closest('[data-tech]')){hover=true;update();}});
  field?.addEventListener('pointerout',e=>{if(!field.contains(e.relatedTarget)||!e.relatedTarget?.closest('[data-tech]')){hover=false;update();}});
  field?.addEventListener('focusin',()=>{focus=true;update();});
  field?.addEventListener('focusout',e=>{if(!field.contains(e.relatedTarget)){focus=false;update();}});
  const driver={state,subscribe(listener){listeners.add(listener);listener(state);return()=>listeners.delete(listener);}};
  drivers.set(section,driver);update();return driver;
}
