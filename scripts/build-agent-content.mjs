import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { portfolio } from '../dist/content.js';
import { technologies } from '../dist/tech-data.js';
import { projectCard, honorsHTML, valuesHTML, aboutHTML, escapeHTML } from '../dist/render-content.js';

const dist = new URL('../dist/', import.meta.url);
const origin = 'https://davidwang.space';
const url = path => new URL(path, `${origin}/`).href;
const link = (label, href) => `[${label.replace(/[\[\]]/g, '\\$&')}](${href})`;
const json = value => `${JSON.stringify(value, null, 2)}\n`;
const write = (path, value) => writeFile(new URL(path, dist), value, 'utf8');
const references = [
  { name: 'Apple · Typography', url: 'https://developer.apple.com/design/human-interface-guidelines/typography' },
  { name: 'Apple · Motion', url: 'https://developer.apple.com/design/human-interface-guidelines/motion' },
  { name: 'React Bits · Glass Surface', url: 'https://reactbits.dev/components/glass-surface' },
  { name: 'Pinterest · Glassmorphism', url: 'https://in.pinterest.com/paint4722/glassmorphism/' }
];
const notes = [
  `内容快照日期：${portfolio.updatedAt}。这些资料来自本站维护的介绍，未在生成机器可读版本时重新核查仓库进展。`,
  '项目状态、实现范围、团队贡献、Mock / 示例数据及图片版本说明均保留原文。仓库推送日期不代表功能完成日期。',
  '获奖与认证按本站个人记录呈现；品牌素材链接仅说明图像来源。技术与工具清单描述具体使用情况，不表示熟练程度或官方背书。',
  'Markdown、JSON 和网页使用相同的站点访问权限。读取这些静态文件不需要执行 JavaScript。'
];

function projectMarkdown(p, level = 1) {
  const h = '#'.repeat(level);
  const award = portfolio.awards.find(a => a.projectId === p.id);
  const images = p.asset ? [p, ...(p.additionalImages || [])] : [];
  return [
    `${h} ${p.name}`,
    `> ${p.summary}`,
    p.subtitle,
    `- ID：${p.id}\n- 分类：${p.category}\n- 状态：${p.status}\n- 技术与方向：${p.tags.join('、')}`,
    `${h}# 起点`, p.question,
    `${h}# 项目与贡献`, p.details.map(d => `- ${d}`).join('\n'),
    `${h}# 实现范围与限制`, p.scope,
    ...(award ? [`${h}# 获奖`, `${award.issuer} · ${award.title} · ${award.subtitle}`] : []),
    `${h}# 链接与来源`, [
      `- ${link('本站项目资料', url(`projects/${p.id}.md`))}`,
      p.repo && `- ${link('代码仓库', p.repo)}`,
      p.source && `- ${link('项目文档', p.source)}`,
      p.website && `- ${link(p.websiteLabel || '项目演示', p.website)}`,
      p.foundationRepo && `- ${link('底座仓库', p.foundationRepo)}`,
      p.branch && `- 记录分支：${p.branch}`,
      p.sourceCommit && `- 资料对应提交：${p.sourceCommit}`,
      p.pushedAt && `- 已记录的仓库推送时间：${p.pushedAt}`,
      `- 内容快照日期：${portfolio.updatedAt}`
    ].filter(Boolean).join('\n'),
    ...(images.length ? [`${h}# 图片与出处`, images.map(i => [
      `- ${link(i.visualLabel || i.assetAlt || p.name, url(i.asset))}`,
      i.assetAlt && `  - 画面：${i.assetAlt}`,
      i.assetSource && `  - ${link('原始出处', i.assetSource)}`
    ].filter(Boolean).join('\n')).join('\n')] : [])
  ].join('\n\n');
}

const profileMarkdown = [
  `# ${portfolio.profile.name}`, `> ${portfolio.profile.headline}`,
  portfolio.profile.description, ...portfolio.profile.about,
  `## 联系与身份\n\n- ${link('个人网站', url('/'))}\n- ${link('GitHub', portfolio.profile.github)}`,
  '## 获奖与认证',
  ...portfolio.awards.map(a => [
    `### ${a.title}`, `${a.issuer} · ${a.subtitle}`, a.description,
    a.date && `记录时间：${a.date}`,
    a.context,
    a.focus && `学习与实践方向：${a.focus.join('、')}`,
    a.projectId && link(a.projectName || '关联作品', url(`projects/${a.projectId}.md`))
  ].filter(Boolean).join('\n\n')),
  '## 个人主张', ...portfolio.values.map(v => `### ${v.word} · ${v.en}\n\n${v.description}`),
  '## 经历记录', ...portfolio.journey.map(j => `- ${j.time} · ${j.title}：${j.description}`),
  '## 资料说明', ...notes
].join('\n\n') + '\n';

const technologiesMarkdown = [
  '# 技术与 AI 工具',
  '> 本站展示的工具及其具体使用情况。保留项目证据、官方来源和素材署名。',
  ...technologies.map(t => [
    `## ${t.name}`, t.summary, t.usage,
    `- ID：${t.id}\n- 分组：${t.group}`,
    t.evidence && `- ${link('项目使用证据', t.evidence)}`,
    `- ${link('官方来源', t.source)}`, t.attribution
  ].filter(Boolean).join('\n\n')),
  '## 资料说明', ...notes
].join('\n\n') + '\n';

const fullMarkdown = [
  profileMarkdown.trim(), '## 项目',
  ...portfolio.projects.map(p => projectMarkdown(p, 3)),
  technologiesMarkdown.trim().replace(/^(#{1,2}) /gm, '$1# '),
  '## 参考与来源',
  ...references.map(r => `- ${link(r.name, r.url)}`),
  '### 品牌素材', ...portfolio.brandSources.map(r => `- ${link(r.name, r.url)}`),
  `## 机器可读数据\n\n${link('JSON 完整数据', url('data/portfolio.json'))}`
].join('\n\n') + '\n';

const llms = [
  '# David Wang · 个人作品与实践',
  `> ${portfolio.profile.description}`,
  ...notes,
  '## 个人与完整资料',
  `- ${link('个人简介、荣誉与主张', url('profile.md'))}: 关于本人、联系方式、${portfolio.awards.length} 项获奖与认证、${portfolio.values.length} 项个人主张及经历。`,
  `- ${link('完整网站 Markdown', url('index.md'))}: 包含所有项目详情、技术工具、来源和限制说明。`,
  `- ${link('完整文本副本', url('llms-full.txt'))}: 与 index.md 内容一致的纯文本入口。`,
  `- ${link('结构化 JSON', url('data/portfolio.json'))}: schemaVersion、profile、projects、awards、values、journey、technologies 与来源链接；asset / logo 等相对路径以 assetBaseUrl 解析。`,
  `- ${link('技术与 AI 工具', url('technologies.md'))}: 每项工具的具体用途、证据与官方来源。`,
  '## 项目',
  ...portfolio.projects.map(p => `- ${link(p.name, url(`projects/${p.id}.md`))}: ${p.status}。${p.summary}`)
].join('\n\n') + '\n';

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage', '@id': url('/#profile-page'), url: url('/'),
      name: 'David Wang · 个人作品与实践', inLanguage: 'zh-CN',
      description: portfolio.profile.description, dateModified: portfolio.updatedAt,
      mainEntity: { '@id': url('/#person') },
      hasPart: portfolio.projects.map(p => ({ '@id': url(`/projects/${p.id}.md#project`) }))
    },
    {
      '@type': 'Person', '@id': url('/#person'), name: portfolio.profile.name,
      url: url('/'), sameAs: [portfolio.profile.github],
      description: [portfolio.profile.description, ...portfolio.profile.about].join('\n\n'),
      award: portfolio.awards.filter(a => !a.credentialName).map(a => `${a.issuer} · ${a.title} · ${a.subtitle}`),
      hasCredential: portfolio.awards.filter(a => a.credentialName).map(a => ({
        '@type': 'EducationalOccupationalCredential', name: a.credentialName,
        description: a.description, recognizedBy: { '@type': 'Organization', name: a.issuer }
      }))
    },
    ...portfolio.projects.map(p => ({
      '@type': p.repo ? 'SoftwareSourceCode' : 'CreativeWork',
      '@id': url(`/projects/${p.id}.md#project`), url: url(`projects/${p.id}.md`),
      name: p.name, description: p.summary, abstract: p.scope,
      text: [p.question, ...p.details, p.scope].join('\n\n'),
      creativeWorkStatus: p.status, keywords: p.tags, inLanguage: 'zh-CN',
      contributor: { '@id': url('/#person') },
      ...(p.repo ? { codeRepository: p.repo } : {}),
      ...(p.source ? { citation: p.source } : {}),
      ...(p.asset ? { image: url(p.asset) } : {})
    }))
  ]
};

await mkdir(new URL('data/', dist), { recursive: true });
await mkdir(new URL('projects/', dist), { recursive: true });
// This directory is reserved for generated project Markdown. Drop removed entries.
const projectFiles = new Set(portfolio.projects.map(p => `${p.id}.md`));
for (const file of await readdir(new URL('projects/', dist))) {
  if (file.endsWith('.md') && !projectFiles.has(file)) await unlink(new URL(`projects/${file}`, dist));
}
for (const p of portfolio.projects) {
  if (!/^[a-z0-9-]+$/.test(p.id)) throw new Error(`Unsafe project ID: ${p.id}`);
  await write(`projects/${p.id}.md`, projectMarkdown(p) + '\n');
}
await write('profile.md', profileMarkdown);
await write('technologies.md', technologiesMarkdown);
await write('index.md', fullMarkdown);
await write('llms-full.txt', fullMarkdown);
await write('llms.txt', llms);
await write('data/portfolio.json', json({
  schemaVersion: '1.0.0', siteUrl: url('/'), assetBaseUrl: url('/'), language: 'zh-CN',
  notes, ...portfolio, technologies, references,
  documents: {
    index: url('llms.txt'), full: url('index.md'), profile: url('profile.md'),
    technologies: url('technologies.md'),
    projects: Object.fromEntries(portfolio.projects.map(p => [p.id, url(`projects/${p.id}.md`)]))
  }
}));

let html = await readFile(new URL('index.html', dist), 'utf8');
const sections = [
  ['project-grid', portfolio.projects.map(projectCard).join('')],
  ['honors-grid', honorsHTML()], ['values-list', valuesHTML()], ['about-copy', aboutHTML()]
];
for (const [id, markup] of sections) {
  const start = `<!-- generated:${id}:start -->`, end = `<!-- generated:${id}:end -->`;
  const block = `${start}${markup}${end}`;
  if (html.includes(start)) {
    html = html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), () => block);
  } else {
    const empty = new RegExp(`(<(div|ul)\\b[^>]*\\bid="${id}"[^>]*>)(</\\2>)`);
    if (!empty.test(html)) throw new Error(`Missing empty container or markers: ${id}`);
    html = html.replace(empty, (_, open, tag, close) => `${open}${block}${close}`);
  }
}
const safeGraph = JSON.stringify(graph).replace(/</g, '\\u003c');
const metadata = [
  '<!-- generated:agent-metadata:start -->',
  '<link rel="describedby" type="text/plain" href="/llms.txt" title="Agent reading guide" />',
  '<link rel="alternate" type="text/markdown" href="/index.md" title="完整网站 Markdown" />',
  '<link rel="alternate" type="application/json" href="/data/portfolio.json" title="Portfolio JSON" />',
  `<script id="portfolio-structured-data" type="application/ld+json">${safeGraph}</script>`,
  '<!-- generated:agent-metadata:end -->'
].join('\n    ');
if (html.includes('<!-- generated:agent-metadata:start -->')) {
  html = html.replace(/<!-- generated:agent-metadata:start -->[\s\S]*?<!-- generated:agent-metadata:end -->/, () => metadata);
} else {
  html = html.replace('  </head>', () => `    ${metadata}\n  </head>`);
}
html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, '<noscript><p>完整项目详情与技术说明可直接阅读 <a href="/index.md">本站文字版</a>，或获取 <a href="/data/portfolio.json">JSON 数据</a>。</p></noscript>');
await write('index.html', html);

const sitemapUrls = ['/', '/profile.md', '/technologies.md', '/index.md', ...portfolio.projects.map(p => `/projects/${p.id}.md`)];
await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(p => `  <url><loc>${escapeHTML(url(p))}</loc></url>`).join('\n')}\n</urlset>\n`);
await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${url('sitemap.xml')}\n`);
console.log(`Generated agent content in ${fileURLToPath(dist)}: ${portfolio.projects.length} projects, ${portfolio.awards.length} honors, ${technologies.length} tools.`);
