// 从固定的原始 main 提交构建完整前端，保留源码和第三方许可。
import { execFileSync } from 'node:child_process';
import { cp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const sourceCommit = 'dcb9ae78b0836a6e067d1f2abaa919f8e243d23b';
if (!process.argv[2]) throw new Error('用法：node scripts/sync-crewtrace-preview.mjs <CrewTrace checkout>');
const source = resolve(process.argv[2]);
const git = (...args) => execFileSync('git', args, { cwd: source, encoding: 'utf8' }).trim();
if (git('rev-parse', 'HEAD') !== sourceCommit) throw new Error(`需要原始提交 ${sourceCommit}`);
if (git('status', '--porcelain', '--untracked-files=no')) throw new Error('CrewTrace 存在未提交的源码修改');
execFileSync('npm', ['--prefix', 'apps/web', 'run', 'build', '--', '--base=/previews/crewtrace/'], { cwd: source, stdio: 'inherit' });

const output = resolve('dist/previews/crewtrace');
await rm(output, { recursive: true, force: true });
await cp(join(source, 'apps/web/dist'), output, { recursive: true });
await cp(join(source, 'LICENSE'), join(output, 'LICENSE'));

const lock = JSON.parse(await readFile(join(source, 'package-lock.json'), 'utf8'));
const notices = [];
for (const [path, info] of Object.entries(lock.packages).sort(([a], [b]) => a.localeCompare(b))) {
  if (!path.includes('node_modules/') || info.dev || info.link) continue;
  const dir = join(source, path);
  const files = (await readdir(dir)).filter(name => /^(licen[cs]e|copying|notice)(\.|$)/i.test(name)).sort();
  if (!files.length) throw new Error(`缺少依赖许可文件：${path}`);
  notices.push(`${path.replace(/^node_modules\//, '')} ${info.version}\n${info.license ?? ''}`);
  for (const name of files) notices.push(`${name}\n${await readFile(join(dir, name), 'utf8')}`);
}
await writeFile(join(output, 'THIRD_PARTY_NOTICES.txt'), notices.join('\n\n---\n\n') + '\n');
await writeFile(join(output, 'source.json'), JSON.stringify({
  repository: 'https://github.com/songconmaisaix31-design/CrewTrace',
  branch: 'main', commit: sourceCommit,
  frontendCommit: '1f9d62f4855c4edea523a766472515e1ba541ab2',
  frontendAuthor: 'yunheliu68-ux',
  build: 'npm ci --ignore-scripts && npm --prefix apps/web run build -- --base=/previews/crewtrace/',
  sourceChanges: [],
  apiGateway: 'https://mon.davidwang.space/api/web',
  license: 'Apache-2.0'
}, null, 2) + '\n');
console.log(`已同步 CrewTrace main@${sourceCommit.slice(0, 7)} 到 ${output}`);
