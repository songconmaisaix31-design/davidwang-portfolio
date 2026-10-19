// The greeting is drawn in handwriting order; no font or remote asset is required.
export function initWelcome() {
  const dialog=document.querySelector('#welcome-dialog');
  const replay=document.querySelector('#replay-tech');
  const enter=document.querySelector('#skip-welcome');
  if(!dialog || typeof dialog.showModal!=='function') return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const key='david-wang:hello:v2';
  const strokes=[...dialog.querySelectorAll('.hello-script path')];
  let animations=[],autoClose=0,fadeClose=0,closing=false,returnFocus=null;
  function announce(open) {
    document.documentElement.classList.toggle('welcome-active',open);
    document.dispatchEvent(new CustomEvent('welcome:state',{detail:{open}}));
  }
  function cleanUp() {
    clearTimeout(autoClose);clearTimeout(fadeClose);
    animations.forEach(animation=>animation.cancel());animations=[];
    dialog.classList.remove('is-leaving');closing=false;
    announce(false);
    if(returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
    returnFocus=null;
  }
  function finish(immediate=false) {
    if(!dialog.open || closing) return;
    clearTimeout(autoClose);closing=true;
    animations.forEach(animation=>animation.finish());
    if(immediate || reduced.matches) {dialog.close();return;}
    dialog.classList.add('is-leaving');
    fadeClose=setTimeout(()=>dialog.close(),560);
  }
  function start(replaying=false) {
    if(dialog.open || reduced.matches) return;
    returnFocus=replaying?document.activeElement:null;
    try {sessionStorage.setItem(key,'seen');} catch { /* Storage can be unavailable. */ }
    dialog.showModal();announce(true);
    let delay=300;
    for(const path of strokes) {
      const duration=Number(path.dataset.duration)*1.75;
      const length=path.getTotalLength();
      if(typeof path.animate==='function') {
        animations.push(path.animate([
          {strokeDasharray:`${length} ${length}`,strokeDashoffset:length},
          {strokeDasharray:`${length} ${length}`,strokeDashoffset:0}
        ],{duration,delay,easing:'linear',fill:'both'}));
      }
      delay+=duration-15;
    }
    autoClose=setTimeout(()=>finish(),delay+800);
  }
  enter.addEventListener('click',()=>finish());
  replay?.addEventListener('click',()=>start(true));
  dialog.addEventListener('cancel',event=>{event.preventDefault();finish();});
  dialog.addEventListener('close',cleanUp);
  reduced.addEventListener('change',()=>{if(reduced.matches)finish(true);});
  let seen=false;
  try {seen=sessionStorage.getItem(key)==='seen';} catch { /* Show once per load without storage. */ }
  if(!seen && (!location.hash || location.hash==='#home')) start();
}
