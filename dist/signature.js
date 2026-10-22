// Shared handwriting for the hero, navigation and footer wordmarks.
export function initSignatureWriting() {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let greeting=document.documentElement.classList.contains('welcome-active'),manual=false;
  let dialogOpen=Boolean(document.querySelector('#detail-dialog')?.open);
  const marks=[...document.querySelectorAll('.signature')].map(svg=>({svg,paths:[...svg.querySelectorAll('path')],animations:[],visible:false,played:false}));
  function prepare(mark) {
    mark.animations.forEach(a=>a.cancel());mark.animations=[];mark.played=false;
    for(const path of mark.paths) {
      const length=path.getTotalLength();
      path.style.strokeDasharray=`${length} ${length}`;
      path.style.strokeDashoffset=reduced.matches?'0':String(length);
    }
  }
  function write(mark) {
    if(mark.played || !mark.visible || greeting || reduced.matches) return;
    mark.played=true;
    let delay=220;
    for(const path of mark.paths) {
      const duration=Number(path.dataset.duration||300)*1.65;
      const length=path.getTotalLength();
      path.style.strokeDashoffset='0';
      if(typeof path.animate==='function') mark.animations.push(path.animate(
        [{strokeDashoffset:length},{strokeDashoffset:0}],
        {duration,delay,easing:'linear',fill:'both'}
      ));
      delay+=duration-12;
    }
  }
  function update() {
    for(const mark of marks) {
      if(reduced.matches) {
        mark.animations.forEach(a=>a.cancel());mark.animations=[];
        mark.paths.forEach(path=>{path.style.strokeDasharray='';path.style.strokeDashoffset='0';});
        continue;
      }
      write(mark);
      for(const animation of mark.animations) {
        if(animation.playState==='finished') continue;
        if(document.hidden || greeting || manual || dialogOpen || !mark.visible) animation.pause();
        else if(animation.playState==='paused') animation.play();
      }
    }
  }
  marks.forEach(prepare);
  if('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries) marks.find(mark=>mark.svg===entry.target).visible=entry.isIntersecting;
      update();
    },{threshold:.05});
    marks.forEach(mark=>observer.observe(mark.svg));
  } else {marks.forEach(mark=>mark.visible=true);update();}
  document.addEventListener('welcome:state',event=>{
    greeting=event.detail.open;
    if(greeting) marks.forEach(prepare);
    update();
  });
  document.addEventListener('signature:pause',event=>{manual=event.detail.paused;update();});
  document.addEventListener('visibilitychange',update);
  document.addEventListener('portfolio:dialog',event=>{dialogOpen=event.detail.open;update();});
  reduced.addEventListener('change',()=>{marks.forEach(prepare);update();});
}
