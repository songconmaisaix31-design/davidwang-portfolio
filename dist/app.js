import { portfolio } from './content.js';
import { initGlassSculptures } from './glass-sculpture.js';
import { technologies } from './tech-data.js';
import { initTechConstellation } from './tech.js';
import { initWelcome } from './welcome.js';
import { initSignatureWriting } from './signature.js';

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeURL = value => { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : ''; } catch { return ''; } };
const external = 'target="_blank" rel="noopener noreferrer"';
const githubIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-3c3-.3 6-1.5 6-6a4.5 4.5 0 0 0-1.2-3.1A4.2 4.2 0 0 0 18.7 3S17.5 2.7 15 4a11.4 11.4 0 0 0-6 0C6.5 2.7 5.3 3 5.3 3a4.2 4.2 0 0 0-.1 2.9A4.5 4.5 0 0 0 4 9c0 4.5 3 5.7 6 6a3.5 3.5 0 0 0-1 3v4"/></svg>';
const trophyIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v5c0 4-2 6-5 6S7 12 7 8V3Zm5 11v5m-4 2h8M7 5H3v3c0 3 2 4 5 4m9-7h4v3c0 3-2 4-5 4"/></svg>';
const dateOnly = value => new Intl.DateTimeFormat('zh-CN', { year:'numeric', month:'2-digit', day:'2-digit', timeZone:'Asia/Shanghai' }).format(new Date(value)).replaceAll('/', '.');
const timeOnly = value => new Intl.DateTimeFormat('zh-CN', { hour:'2-digit', minute:'2-digit', hour12:false, timeZone:'Asia/Shanghai' }).format(new Date(value));
const validDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
const CACHE_KEY = 'david-wang:github:v2';
const CACHE_TTL = 15 * 60 * 1000;
const repoProjects = portfolio.projects.filter(p => p.repo);
const repoSignature = repoProjects.map(p => p.id).sort().join('|');
const repoState = Object.fromEntries(repoProjects.map(p => [p.id, { pushedAt: p.pushedAt }]));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const dialog = $('#detail-dialog');
let filter = 'all';
let syncing = false;
let lastAttempt = 0;
let toastTimer;
let lastTrigger;
let previousOverflow = '';
let revealObserver;

function toast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('visible'), 4300);
}
function branchURL(project) {
  const repo = safeURL(project.repo);
  return project.branch ? `${repo}/tree/${encodeURI(project.branch)}` : repo;
}
function awardFor(project) { return portfolio.awards.find(a => a.projectId === project.id); }
function logoFor(award) {
  return `<span class="logo-well logo-${escapeHTML(award.id)}"><img src="./${escapeHTML(award.logo)}" alt="${escapeHTML(award.issuer)} Logo" loading="lazy" decoding="async" /></span>`;
}
function coverFor(project) {
  if (project.id === 'research') return '<div class="research-cover"><img src="./assets/iflytek-logo.svg" alt="科大讯飞 Logo" width="168" height="33" loading="lazy" /><strong>一等奖</strong></div>';
  if (project.asset) return `<img src="./${escapeHTML(project.asset)}" alt="${escapeHTML(project.assetAlt || `${project.name} 项目界面`)}" width="1200" height="760" loading="lazy" decoding="async" />`;
  return `<div class="repo-cover">${githubIcon}<strong>${escapeHTML(project.name)}</strong><p>${escapeHTML(project.subtitle)}</p></div>`;
}
function projectCard(project, index) {
  const award = awardFor(project);
  const skills = project.tags.slice(0, 3).join(' · ');
  return `<article class="project-card glass" data-id="${escapeHTML(project.id)}" data-reveal style="--delay:${(index % 2) * 100}ms">
    <button class="project-cover ${project.visualKind === 'poster' ? 'poster' : project.visualKind === 'repository-logo' ? 'logo' : ''}" data-project="${escapeHTML(project.id)}" aria-label="查看 ${escapeHTML(project.name)} 项目详情">${coverFor(project)}<span class="cover-arrow" aria-hidden="true">↗</span></button>
    <div class="project-body">${award ? `<span class="project-award">${trophyIcon}${escapeHTML(award.issuer)} · ${escapeHTML(award.title)}</span>` : ''}<div class="project-heading"><h3><button type="button" data-project="${escapeHTML(project.id)}">${escapeHTML(project.name)}</button></h3></div><p class="project-summary">${escapeHTML(project.summary)}</p><div class="project-footer"><span>${escapeHTML(skills)}</span>${project.repo ? `<a href="${escapeHTML(branchURL(project))}" ${external} aria-label="打开 ${escapeHTML(project.name)} 的 GitHub 仓库">${githubIcon}<span>GitHub ↗</span></a>` : `<button data-project="${escapeHTML(project.id)}">了解作品 ↗</button>`}</div></div>
  </article>`;
}
function renderProjects() {
  const visible = portfolio.projects.filter(p => filter === 'all' || p.category === filter);
  const grid = $('#project-grid');
  grid.innerHTML = visible.map(projectCard).join('');
  grid.classList.toggle('filtered', filter !== 'all');
  observeReveals(grid);
}
function renderHonors() {
  $('#honors-grid').innerHTML = portfolio.awards.map((a, index) => `<article class="honor-card glass" data-reveal style="--delay:${index % 2 * 100}ms">${logoFor(a)}<h3>${escapeHTML(a.displayTitle || a.title)}</h3><p>${escapeHTML(a.subtitle)}${a.context ? `<br />${escapeHTML(a.context)}` : ''}</p><button class="honor-link" ${a.projectId ? `data-project="${escapeHTML(a.projectId)}"` : `data-info="${escapeHTML(a.id)}"`}>${escapeHTML(a.projectId ? a.projectName || '查看获奖作品' : '查看认证方向')}<span aria-hidden="true">↗</span></button></article>`).join('');
}
function renderStory() {
  $('#values-list').innerHTML = portfolio.values.map((item, index) => `<li class="principle" data-reveal style="--delay:${index * 65}ms"><h3 class="principle-word">${escapeHTML(item.word)}</h3><p class="principle-description">${escapeHTML(item.description)}</p></li>`).join('');
  $('#about-copy').innerHTML = portfolio.profile.about.map(p => `<p>${escapeHTML(p)}</p>`).join('');
}
function observeReveals(root = document) {
  if (!revealObserver) return;
  $$('[data-reveal]:not(.is-visible)', root).forEach(el => revealObserver.observe(el));
}
function initMotion() {
  revealObserver?.disconnect();
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    document.documentElement.classList.remove('motion-ready');
    revealObserver = null;
    return;
  }
  try {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold:.06, rootMargin:'0px 0px -6% 0px' });
    document.documentElement.classList.add('motion-ready');
    observeReveals();
  } catch {
    document.documentElement.classList.remove('motion-ready');
    revealObserver = null;
  }
}
if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', initMotion);
else reduceMotion.addListener?.(initMotion);

function openDialog(html, trigger) {
  lastTrigger = trigger || document.activeElement;
  $('#dialog-content').innerHTML = html;
  dialog.scrollTop = 0;
  if (!dialog.open) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  }
  $('.dialog-close').focus({ preventScroll:true });
}
function figureFor(p) {
  if (!p.asset) return '';
  const label = p.visualLabel || '项目界面';
  return `<figure class="dialog-figure"><a href="./${escapeHTML(p.asset)}" ${external} aria-label="查看 ${escapeHTML(p.name)} 原图"><img class="dialog-art" src="./${escapeHTML(p.asset)}" alt="${escapeHTML(p.assetAlt || label)}" /></a><figcaption><span>${escapeHTML(label)}</span>${p.assetSource ? `<a href="${escapeHTML(safeURL(p.assetSource))}" ${external}>图片来源 ↗</a>` : ''}<a href="./${escapeHTML(p.asset)}" ${external}>查看原图 ↗</a></figcaption></figure>`;
}
function openProject(id, trigger) {
  const p = portfolio.projects.find(item => item.id === id);
  if (!p) return;
  const date = repoState[p.id]?.pushedAt;
  const award = awardFor(p);
  openDialog(`<div class="dialog-kicker">${escapeHTML(p.status)}</div><h2 id="dialog-title">${escapeHTML(p.name)}</h2><p class="dialog-subtitle">${escapeHTML(p.summary)}</p><div class="project-tags">${p.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>${figureFor(p)}${(p.additionalImages || []).map(image => figureFor({ ...p, ...image })).join('')}${award ? `<h3>${escapeHTML(award.issuer)} · ${escapeHTML(award.title)}</h3><p>${escapeHTML(award.subtitle)}</p>` : ''}<h3>从这个问题开始</h3><p>${escapeHTML(p.question)}</p><h3>项目与贡献</h3><ul>${p.details.map(d => `<li>${escapeHTML(d)}</li>`).join('')}</ul><p class="dialog-scope">${escapeHTML(p.scope)}</p><div class="dialog-actions">${p.repo ? `<a class="button button-primary" href="${escapeHTML(branchURL(p))}" ${external}>查看源代码 <span aria-hidden="true">↗</span></a>` : ''}${p.website ? `<a class="button button-glass" href="${escapeHTML(safeURL(p.website))}" ${external}>${escapeHTML(p.websiteLabel || '打开项目')} <span aria-hidden="true">↗</span></a>` : ''}${p.foundationRepo ? `<a class="quiet-link" href="${escapeHTML(safeURL(p.foundationRepo))}" ${external}>OpenDashboard 底座 ↗</a>` : ''}</div><div class="dialog-source">${p.repo ? `<span>仓库更新：${validDate(date) ? dateOnly(date) : '已收录'}</span>` : '<span>个人获奖记录</span>'}${p.source ? `<a href="${escapeHTML(safeURL(p.source))}" ${external}>项目说明 ↗</a>` : ''}</div>`, trigger);
}
function sourceLink(title, description, url) {
  return `<a href="${escapeHTML(safeURL(url))}" ${external}><strong>${escapeHTML(title)} ↗</strong><small>${escapeHTML(description)}</small></a>`;
}
function openInfo(kind, trigger) {
  if (kind === 'tech') {
    const groups = [['code','语言与界面'],['engineering','服务、Agent 与工程'],['ai','日常 AI 工具'],['learning','学习与实践']];
    const sections = groups.map(([id,label]) => `<section class="tech-catalog-group"><h3>${label}</h3><div class="tech-catalog-grid">${technologies.filter(t=>t.group===id).map(t=>`<button type="button" class="tech-catalog-card" data-tech-detail="${escapeHTML(t.id)}">${techLogo(t)}<span><strong>${escapeHTML(t.name)}</strong><small>${escapeHTML(t.summary)}</small></span></button>`).join('')}</div></section>`).join('');
    openDialog(`<h2 id="dialog-title">我的技术与 AI 工具</h2><p class="tech-dialog-intro">从界面、服务到 Agent 协作，把想法一步步做成作品。点击标识，看看它在我的实践中承担什么工作。</p>${sections}`,trigger);
  } else if (kind === 'nvidia') {
    const a = portfolio.awards.find(item => item.id === 'nvidia');
    openDialog(`${logoFor(a)}<h2 id="dialog-title">NVIDIA 初级工程师认证</h2><p class="dialog-subtitle">${escapeHTML(a.credentialName)}</p><h3>认证与学习方向</h3><p>${escapeHTML(a.description)}</p><div class="project-tags">${a.focus.map(f => `<span class="tag">${escapeHTML(f)}</span>`).join('')}</div><p class="dialog-scope">把学到的知识带回具体项目，继续理解模型、工具与真实应用之间的连接。</p><div class="dialog-actions"><a class="button button-primary" href="https://www.nvidia.cn/training/" ${external}>查看认证介绍 ↗</a></div>`, trigger);
  } else if (kind === 'sources') {
    const repoLinks = repoProjects.map(p => sourceLink(p.name, '项目文档与实现范围', p.source)).join('');
    const referenceLinks = [
      sourceLink('Apple · Typography', '字体、层级与阅读节奏', 'https://developer.apple.com/design/human-interface-guidelines/typography'),
      sourceLink('Apple · Motion', '过渡与减少动态效果', 'https://developer.apple.com/design/human-interface-guidelines/motion'),
      sourceLink('React Bits · Glass Surface', '透明材质与高光层次', 'https://reactbits.dev/components/glass-surface'),
      sourceLink('Pinterest · Glassmorphism', '玻璃风格的灵感检索入口', 'https://in.pinterest.com/paint4722/glassmorphism/')
    ].join('');
    const logos = portfolio.brandSources.map(s => sourceLink(s.name, '官方 Logo 来源', s.url)).join('');
    openDialog(`<h2 id="dialog-title">参考与来源</h2><p class="dialog-subtitle">项目介绍来自仓库文档，获奖经历与个人主张按我的最新记录维护。截图的来源与展示范围可以在各项目详情中查看。</p><h3>项目资料</h3><div class="source-links">${repoLinks}</div><h3>设计参考</h3><div class="source-links">${referenceLinks}</div><h3>品牌素材</h3><div class="source-links">${logos}</div><h3>GitHub 同步</h3><p>打开主页时会读取 ${repoProjects.length} 个公开仓库的最近推送时间，保留 15 分钟本机缓存。项目介绍和截图依据核对过的资料更新。</p>`, trigger);
  }
}

function techLogo(t) {
  return `<span class="tech-logo-well ${t.surface==='dark'?'logo-surface-dark':''} ${t.wide?'tech-logo-wide':''}"><img src="./${escapeHTML(t.logo)}" alt="" width="48" height="48" /></span>`;
}
function openTech(id,trigger) {
  const t=technologies.find(item=>item.id===id);
  if (!t) return;
  // Keep the outside opener when switching views within the shared dialog.
  const opener=dialog.contains(trigger)?lastTrigger:trigger;
  openDialog(`<div class="tech-detail-head">${techLogo(t)}<div><p>${escapeHTML(t.summary)}</p><h2 id="dialog-title">${escapeHTML(t.name)}</h2></div></div><p>${escapeHTML(t.usage)}</p>${t.attribution?`<p class="tech-attribution">${escapeHTML(t.attribution)}</p>`:''}<div class="tech-detail-links">${t.evidence?`<a href="${escapeHTML(safeURL(t.evidence))}" ${external}>查看项目中的使用 ↗</a>`:''}<a href="${escapeHTML(safeURL(t.source))}" ${external}>官方品牌来源 ↗</a></div><button class="tech-back" type="button" data-tech-back>← 全部技术与工具</button>`,opener);
}

dialog.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow;
  if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll:true });
  else if (lastTrigger?.dataset?.project) $(`[data-project="${lastTrigger.dataset.project}"]`)?.focus({ preventScroll:true });
});
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
$('.dialog-close').addEventListener('click', () => dialog.close());
document.addEventListener('click', event => {
  const techButton = event.target.closest('[data-tech-detail]');
  if (techButton) return openTech(techButton.dataset.techDetail,techButton);
  if (event.target.closest('[data-tech-back]')) return openInfo('tech',lastTrigger);
  const projectButton = event.target.closest('[data-project]');
  if (projectButton) return openProject(projectButton.dataset.project, projectButton);
  const infoButton = event.target.closest('[data-info]');
  if (infoButton) return openInfo(infoButton.dataset.info, infoButton);
});
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  $$('[data-filter]').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  renderProjects();
}));
function readCache() {
  try {
    const raw = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (!raw || !Number.isFinite(raw.syncedAt) || raw.syncedAt > Date.now() + 300000 || raw.signature !== repoSignature || !raw.repos) return null;
    let valid = 0;
    for (const p of repoProjects) {
      const value = raw.repos[p.id]?.pushedAt;
      if (validDate(value)) { repoState[p.id] = { pushedAt:value }; valid += 1; }
    }
    return { ...raw, complete:raw.complete && valid === repoProjects.length };
  } catch { return null; }
}
async function fetchRepo(project) {
  const path = new URL(project.repo).pathname;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`https://api.github.com/repos${path}`, { signal:controller.signal, headers:{ Accept:'application/vnd.github+json' }, credentials:'omit' });
    if (!response.ok) throw new Error(`GitHub ${response.status}`);
    const data = await response.json();
    if (data.full_name?.toLowerCase() !== path.slice(1).toLowerCase() || !validDate(data.pushed_at)) throw new Error('Unexpected repository response');
    return { id:project.id, pushedAt:data.pushed_at };
  } finally { clearTimeout(timeout); }
}
async function syncRepositories(manual = false) {
  if (syncing) return;
  if (manual && Date.now() - lastAttempt < 12000) return toast('刚刚已尝试同步，请稍后再试。');
  syncing = true;
  lastAttempt = Date.now();
  const button = $('#sync-projects');
  button.disabled = true;
  button.classList.add('loading');
  $('span', button).textContent = '正在同步…';
  try {
    const results = await Promise.allSettled(repoProjects.map(fetchRepo));
    let updated = 0;
    for (const result of results) if (result.status === 'fulfilled') {
      repoState[result.value.id] = { pushedAt:result.value.pushedAt };
      updated += 1;
    }
    const status = $('#sync-status');
    if (updated) {
      const syncedAt = Date.now();
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ syncedAt, signature:repoSignature, repos:repoState, complete:updated === repoProjects.length })); } catch {}
      status.textContent = updated === repoProjects.length ? `${updated} 个仓库已同步 · ${timeOnly(syncedAt)}` : `已同步 ${updated}/${repoProjects.length} 个仓库，其余保留记录。`;
      if (manual) toast(updated === repoProjects.length ? `${updated} 个仓库已同步。` : `已更新 ${updated} 个仓库，其余保留已有记录。`);
    } else {
      status.textContent = '暂时无法连接 GitHub，作品资料仍可查看。';
      if (manual) toast(status.textContent);
    }
    // Metadata updates never rebuild the cards or restart scroll transitions.
  } catch {
    if (manual) toast('暂时无法连接 GitHub，作品资料仍可查看。');
  } finally {
    syncing = false;
    button.disabled = false;
    button.classList.remove('loading');
    $('span', button).textContent = '同步 GitHub';
  }
}
$('#sync-projects').addEventListener('click', () => syncRepositories(true));

const moon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.5A8.7 8.7 0 0 1 8.5 3.8 8.7 8.7 0 1 0 20.2 15.5Z"/></svg>';
const sun = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></svg>';
function setTheme(theme) {
  document.body.dataset.theme = theme;
  const button = $('.theme-button');
  button.innerHTML = theme === 'dark' ? sun : moon;
  const label = theme === 'dark' ? '切换为浅色主题' : '切换为深色主题';
  button.setAttribute('aria-label', label);
  button.title = label;
  $('meta[name="theme-color"]').content = theme === 'dark' ? '#10161f' : '#f5f7fa';
  try { localStorage.setItem('ai-action:theme', theme); } catch {}
}
let theme = 'light';
try { theme = localStorage.getItem('ai-action:theme') === 'dark' ? 'dark' : 'light'; } catch {}
setTheme(theme);
$('.theme-button').addEventListener('click', () => setTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark'));
const menuButton = $('.menu-button');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '展开导航');
  $('#mobile-nav').hidden = true;
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '收起导航' : '展开导航');
  $('#mobile-nav').hidden = !open;
});
$$('#mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus({ preventScroll:true });
  }
});
const mobileBreakpoint = window.matchMedia('(max-width: 650px)');
const handleLayoutChange = event => {
  if (event.matches) return;
  const focusInMenu = $('#mobile-nav').contains(document.activeElement);
  closeMenu();
  if (focusInMenu) $('.desktop-nav a').focus({ preventScroll:true });
};
if (mobileBreakpoint.addEventListener) mobileBreakpoint.addEventListener('change', handleLayoutChange);
else mobileBreakpoint.addListener?.(handleLayoutChange);
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
$('#copy-site').addEventListener('click', async event => {
  const url = location.origin + location.pathname;
  try { await navigator.clipboard.writeText(url); toast('主页链接已复制。'); }
  catch { openDialog(`<h2 id="dialog-title">主页链接</h2><p class="dialog-subtitle">选择下方链接即可复制。</p><input class="copy-field" aria-label="主页链接" value="${escapeHTML(url)}" readonly />`, event.currentTarget); $('.copy-field').select(); }
});
let scrollQueued = false;
function updateNavigation() {
  $('.site-header').classList.toggle('scrolled', window.scrollY > 30);
  let active = '';
  for (const id of ['projects','milestones','principles','about']) if ($(`#${id}`).getBoundingClientRect().top < 220) active = id;
  $$('.desktop-nav a').forEach(link => {
    const on = link.hash === `#${active}`;
    link.classList.toggle('active', on);
    if (on) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateNavigation); }
}, { passive:true });

const cache = readCache();
renderProjects();
renderHonors();
renderStory();
initMotion();
updateNavigation();
initWelcome();
initSignatureWriting();
initGlassSculptures();
initTechConstellation(openTech);
if (!cache || Date.now() - cache.syncedAt >= CACHE_TTL || !cache.complete) setTimeout(() => syncRepositories(false), 900);
