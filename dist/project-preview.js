// Embed the original website only while its preview can be seen.
export function createProjectPreviews() {
  const previews=new Map();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let dialogOpen=Boolean(document.querySelector('#detail-dialog')?.open);
  function stop(state) {
    state.frame?.remove();state.frame=null;
    state.host.classList.remove('preview-loaded');
  }
  function update(state) {
    const run=state.visible&&!state.paused&&!document.hidden&&(!dialogOpen||state.full);
    if(run&&!state.frame) {
      const frame=document.createElement('iframe');
      frame.title=`${state.name} 完整网站实时预览`;
      frame.setAttribute('sandbox','allow-scripts allow-same-origin');
      frame.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
      if(!state.full) {frame.tabIndex=-1;frame.setAttribute('aria-hidden','true');}
      frame.addEventListener('load',()=>{
        if(state.frame===frame)state.host.classList.add('preview-loaded');
      });
      frame.src=state.url;
      state.frame=frame;
      state.surface.append(frame);
    } else if(!run) stop(state);
    state.button.textContent=state.paused?'播放网站动效':'暂停网站动效';
    state.button.setAttribute('aria-label',`${state.paused?'播放':'暂停'} ${state.name} 网站预览`);
    state.button.setAttribute('aria-pressed',String(!state.paused));
    state.host.classList.add('preview-enabled');
  }
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    for(const entry of entries) {
      const state=previews.get(entry.target);
      if(state) {state.visible=entry.isIntersecting;update(state);}
    }
  },{threshold:.01}):null;
  const resize='ResizeObserver' in window?new ResizeObserver(entries=>{
    for(const entry of entries) {
      const state=previews.get(entry.target);
      if(state&&!state.full)state.surface.style.transform=`scale(${entry.contentRect.width/1280})`;
    }
  }):null;
  function observe(root=document) {
    for(const host of root.querySelectorAll('[data-preview-url]')) {
      if(previews.has(host))continue;
      const url=new URL(host.dataset.previewUrl);
      if(url.protocol!=='https:')continue;
      const state={host,url:url.href,name:host.dataset.previewName,full:host.dataset.previewMode==='full',
        surface:host.querySelector('.preview-surface'),button:host.querySelector('[data-preview-toggle]'),
        visible:!observer,paused:reduced.matches,frame:null};
      state.toggle=()=>{state.paused=!state.paused;update(state);};
      state.button.addEventListener('click',state.toggle);
      previews.set(host,state);
      if(!state.full)state.surface.style.transform=`scale(${host.getBoundingClientRect().width/1280})`;
      observer?.observe(host);resize?.observe(host);update(state);
    }
  }
  function release(root) {
    for(const [host,state] of previews) if(root.contains(host)) {
      stop(state);observer?.unobserve(host);resize?.unobserve(host);
      state.button.removeEventListener('click',state.toggle);previews.delete(host);
    }
  }
  document.addEventListener('visibilitychange',()=>previews.forEach(update));
  document.addEventListener('portfolio:dialog',event=>{
    dialogOpen=event.detail.open;previews.forEach(update);
  });
  reduced.addEventListener('change',()=>{
    previews.forEach(state=>{state.paused=reduced.matches;update(state);});
  });
  return {observe,release};
}
