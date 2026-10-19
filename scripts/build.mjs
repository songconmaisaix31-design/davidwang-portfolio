// Vercel 构建钩子：本站无打包步骤，dist/ 就是最终产物。
// 这里只做产物存在性校验，避免上传了空目录或漏掉入口文件。
import { access, readFile, stat } from 'node:fs/promises';

const OUT_DIR = 'dist';
const entry = `${OUT_DIR}/index.html`;

const die = (msg) => {
  console.error(`[build] ${msg}`);
  process.exit(1);
};

try {
  await access(entry);
} catch {
  die(`找不到 ${entry}，检查是否把站点文件提交到了 dist/ 目录。`);
}

const html = await readFile(entry, 'utf8');
if (!html.includes('<main')) die('index.html 结构异常：缺少 <main>。');

// 校验 HTML 里引用的本地样式/脚本/图片都存在
const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((href) => !/^(?:https?:|\/\/|data:|mailto:|#|javascript:)/.test(href));

const missing = [];
for (const ref of refs) {
  const rel = ref.replace(/^\.?\//, '').split(/[?#]/)[0];
  if (!rel) continue;
  try {
    await access(`${OUT_DIR}/${rel}`);
  } catch {
    missing.push(ref);
  }
}
if (missing.length) die(`以下本地资源缺失：\n  ${missing.join('\n  ')}`);

const { size } = await stat(entry);
console.log(
  `[build] 静态产物校验通过：${entry}（${size} bytes，${refs.length} 个本地引用全部存在）。`
);
