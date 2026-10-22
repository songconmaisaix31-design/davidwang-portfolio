// Shared markup for static HTML and the existing browser interactions.
import { portfolio } from './content.js';

const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeURL = value => { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : ''; } catch { return ''; } };
const external = 'target="_blank" rel="noopener noreferrer"';
const githubIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-3c3-.3 6-1.5 6-6a4.5 4.5 0 0 0-1.2-3.1A4.2 4.2 0 0 0 18.7 3S17.5 2.7 15 4a11.4 11.4 0 0 0-6 0C6.5 2.7 5.3 3 5.3 3a4.2 4.2 0 0 0-.1 2.9A4.5 4.5 0 0 0 4 9c0 4.5 3 5.7 6 6a3.5 3.5 0 0 0-1 3v4"/></svg>';
const trophyIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v5c0 4-2 6-5 6S7 12 7 8V3Zm5 11v5m-4 2h8M7 5H3v3c0 3 2 4 5 4m9-7h4v3c0 3-2 4-5 4"/></svg>';
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
function livePreviewFor(project, full=false) {
  const source=safeURL(project.livePreview);
  if(!source) return '';
  return `<div class="project-preview ${full?'project-preview-full':'project-preview-card'}" data-preview-url="${escapeHTML(source)}" data-preview-mode="${full?'full':'card'}" data-preview-name="${escapeHTML(project.name)}">
    <img class="preview-poster" src="./${escapeHTML(project.asset)}" alt="${escapeHTML(project.assetAlt)}" width="1200" height="760" loading="lazy" decoding="async" />
    <div class="preview-surface"></div>
    ${full?'':`<button type="button" class="preview-open" data-project="${escapeHTML(project.id)}" aria-label="查看 ${escapeHTML(project.name)} 项目详情与完整网站"><span class="cover-arrow" aria-hidden="true">↗</span></button>`}
    <button type="button" class="preview-toggle" data-preview-toggle aria-label="播放 ${escapeHTML(project.name)} 网站预览" aria-pressed="false">播放网站动效</button>
  </div>`;
}
function projectMediaFor(project) {
  if(project.livePreview) return `<div class="project-cover project-cover-live">${livePreviewFor(project)}</div>`;
  return `<button class="project-cover ${project.visualKind === 'poster' ? 'poster' : project.visualKind === 'repository-logo' ? 'logo' : ''}" data-project="${escapeHTML(project.id)}" aria-label="查看 ${escapeHTML(project.name)} 项目详情">${coverFor(project)}<span class="cover-arrow" aria-hidden="true">↗</span></button>`;
}
function projectCard(project, index) {
  const award = awardFor(project);
  const skills = project.tags.slice(0, 3).join(' · ');
  return `<article class="project-card glass" data-id="${escapeHTML(project.id)}" data-reveal style="--delay:${(index % 2) * 100}ms">
    ${projectMediaFor(project)}
    <div class="project-body">${award ? `<span class="project-award">${trophyIcon}${escapeHTML(award.issuer)} · ${escapeHTML(award.title)}</span>` : ''}<div class="project-heading"><h3><button type="button" data-project="${escapeHTML(project.id)}">${escapeHTML(project.name)}</button></h3></div><p class="project-summary">${escapeHTML(project.summary)}</p><div class="project-footer"><span>${escapeHTML(skills)}</span>${project.repo ? `<a href="${escapeHTML(branchURL(project))}" ${external} aria-label="打开 ${escapeHTML(project.name)} 的 GitHub 仓库">${githubIcon}<span>GitHub ↗</span></a>` : `<button data-project="${escapeHTML(project.id)}">了解作品 ↗</button>`}</div></div>
  </article>`;
}
function honorsHTML() {
  return portfolio.awards.map((a, index) => `<article class="honor-card glass" data-reveal style="--delay:${index % 2 * 100}ms">${logoFor(a)}<h3>${escapeHTML(a.displayTitle || a.title)}</h3><p>${escapeHTML(a.subtitle)}${a.context ? `<br />${escapeHTML(a.context)}` : ''}</p><button class="honor-link" ${a.projectId ? `data-project="${escapeHTML(a.projectId)}"` : `data-info="${escapeHTML(a.id)}"`}>${escapeHTML(a.projectId ? a.projectName || '查看获奖作品' : '查看认证方向')}<span aria-hidden="true">↗</span></button></article>`).join('');
}
function valuesHTML() {
  return portfolio.values.map((item, index) => `<li class="principle" data-reveal style="--delay:${index * 65}ms"><h3 class="principle-word">${escapeHTML(item.word)}</h3><p class="principle-description">${escapeHTML(item.description)}</p></li>`).join('');
}
function aboutHTML() {
  return portfolio.profile.about.map(p => `<p>${escapeHTML(p)}</p>`).join('');
}

export { escapeHTML, safeURL, external, githubIcon, trophyIcon, branchURL, awardFor, logoFor, coverFor, livePreviewFor, projectCard, honorsHTML, valuesHTML, aboutHTML };
