import { technologies } from './tech-data.js';
import { planetPoint, getHeroMotion } from './hero-orbit.js';

const escapeHTML = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mobileIds = ['typescript','python','go','react','cursor','codex','claude','deepseek','opencode','ds-harness','qoder','workbuddy','linux','github','minimax','kimi','glm','grok-bot','muse','seedance','openai'];

export function initTechConstellation(openDetail) {
  const hero=document.querySelector('#home');
  const field=document.querySelector('#tech-constellation');
  const copy=hero.querySelector('.hero-copy');
  const items=technologies.filter(t=>t.hero);
  field.innerHTML=items.map(t=>`<div class="tech-slot" data-tech-slot="${escapeHTML(t.id)}"><button type="button" class="tech-orb ${t.mono?'tech-mono':''} ${t.mascot?'tech-mascot':''}" data-tech="${escapeHTML(t.id)}" aria-label="了解 ${escapeHTML(t.name)} 的使用情况"><img src="./${escapeHTML(t.heroLogo||t.logo)}" alt="" width="48" height="48" decoding="async" /></button></div>`).join('');
  const slots=[...field.children];
  const styles=new WeakMap(slots.map(slot=>[slot,{}]));
  const driver=getHeroMotion(hero);
  let width=0,height=0,clearX=0,clearY=0,copyX=0,copyY=0,visible=[];
  function layout() {
    const box=field.getBoundingClientRect(), text=copy.getBoundingClientRect();
    width=box.width;height=box.height;
    clearX=text.width/2+22;clearY=text.height/2+22;
    copyX=text.left-box.left+text.width/2-width/2;
    copyY=text.top-box.top+text.height/2-height/2;
    visible=slots.filter((slot,i)=>{
      slot.hidden=width<=650&&!mobileIds.includes(items[i].id);
      return !slot.hidden;
    });
    draw(driver.state);
  }
  function draw(state) {
    if (!width) return;
    const activeElement=document.activeElement;
    visible.forEach((slot,i)=>{
      const lane=i%3;
      const u=i/visible.length*Math.PI*2+.24+state.time*(.040+lane*.004);
      const p=planetPoint(u,lane,state.time,state.pointerX,state.pointerY);
      const progress=state.reduced?1:Math.max(0,Math.min(1,(state.age-i*.025)/1.6));
      const spread=1-Math.pow(1-progress,4);
      const x=p.x*width/2*spread,y=p.y*height/2*spread;
      // The belt passes behind the copy, with no visible orbit lines or backing cards.
      const clearance=Math.max(Math.abs(x-copyX)/clearX,Math.abs(y-copyY)/clearY);
      const legibility=slot.contains(activeElement)?1:Math.max(0,Math.min(1,(clearance-.83)/.28));
      const depth=Math.max(.76,Math.min(1.16,1+p.z*.45));
      const rotation=7*Math.sin(u+state.time*.06)+p.z*12;
      const opacity=progress*(.72+Math.max(0,p.z)*.8)*legibility;
      const next={
        transform:`translate3d(calc(-50% + ${x.toFixed(2)}px),calc(-50% + ${y.toFixed(2)}px),0) scale(${(depth*(.5+.5*spread)).toFixed(3)}) rotate(${rotation.toFixed(2)}deg)`,
        opacity:opacity.toFixed(3),
        zIndex:String(10+Math.round(p.z*8)),
        pointerEvents:opacity>.25?'auto':'none'
      };
      const previous=styles.get(slot);
      for(const key of Object.keys(next)) if(previous[key]!==next[key]) {
        slot.style[key]=next[key];previous[key]=next[key];
      }
    });
  }
  field.addEventListener('click',e=>{
    const button=e.target.closest('[data-tech]');
    if(button)openDetail(button.dataset.tech,button);
  });
  if('ResizeObserver' in window) {const observer=new ResizeObserver(layout);observer.observe(field);observer.observe(copy);}
  else window.addEventListener('resize',layout,{passive:true});
  layout();driver.subscribe(draw);
}
