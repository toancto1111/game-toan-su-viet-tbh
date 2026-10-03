// So sánh số câu hỏi từng bài giữa bản CŨ (git HEAD, import tĩnh) và bản MỚI (questionStore lazy-load).
// Chạy: node verify_questions.mjs
import { build } from 'esbuild';
import { execSync } from 'node:child_process';
import { writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const tmp = path.join(root, '.verify_tmp');
mkdirSync(tmp, { recursive: true });

// Bản cũ lấy từ git HEAD, đặt cạnh các file dữ liệu để import tương đối còn đúng
const oldSrc = execSync('git show HEAD:geminiService.ts', { cwd: root, maxBuffer: 1 << 28 }).toString();
writeFileSync(path.join(root, '_verify_old_gemini.ts'), oldSrc);

writeFileSync(path.join(root, '_verify_entry_old.ts'), `
import { MATH_DATA, getQuestionsForLesson } from './_verify_old_gemini';
export async function counts() { return collect(MATH_DATA, getQuestionsForLesson); }
function collect(M: any, g: any) {
  const out: Record<string, number> = {};
  for (const grade of [6,7,8,9]) (M[grade]||[]).forEach((c: any, ci: number) =>
    (c.lessons||[]).forEach((_: any, li: number) => { out[\`g\${grade}-c\${ci}-l\${li}\`] = g(grade, ci, li).length; }));
  return out;
}`);

writeFileSync(path.join(root, '_verify_entry_new.ts'), `
import { MATH_DATA, getQuestionsForLesson } from './geminiService';
import { loadGradeQuestions } from './questionStore';
export async function counts() {
  for (const g of [6,7,8,9]) await loadGradeQuestions(g);
  const out: Record<string, number> = {};
  for (const grade of [6,7,8,9]) (MATH_DATA[grade]||[]).forEach((c: any, ci: number) =>
    (c.lessons||[]).forEach((_: any, li: number) => { out[\`g\${grade}-c\${ci}-l\${li}\`] = getQuestionsForLesson(grade, ci, li).length; }));
  return out;
}`);

const bundle = async (entry, outfile) => build({
  entryPoints: [path.join(root, entry)], outfile: path.join(tmp, outfile),
  bundle: true, platform: 'node', format: 'esm', logLevel: 'error',
  define: { 'import.meta.env': '{}' },
});

try {
  await bundle('_verify_entry_old.ts', 'old.mjs');
  await bundle('_verify_entry_new.ts', 'new.mjs');
  const oldC = await (await import(pathToFileURL(path.join(tmp, 'old.mjs')).href)).counts();
  const newC = await (await import(pathToFileURL(path.join(tmp, 'new.mjs')).href)).counts();

  const keys = [...new Set([...Object.keys(oldC), ...Object.keys(newC)])];
  const diffs = keys.filter(k => oldC[k] !== newC[k]);
  const byGrade = g => keys.filter(k => k.startsWith(`g${g}-`));
  for (const g of [6, 7, 8, 9]) {
    const ks = byGrade(g);
    const so = ks.reduce((s, k) => s + (oldC[k] || 0), 0);
    const sn = ks.reduce((s, k) => s + (newC[k] || 0), 0);
    console.log(`Lớp ${g}: ${ks.length} bài | tổng câu CŨ=${so} | MỚI=${sn}`);
  }
  console.log(diffs.length === 0
    ? `\nKẾT QUẢ: KHỚP 100% (${keys.length} bài)`
    : `\nKẾT QUẢ: LỆCH ${diffs.length} bài:\n` + diffs.map(k => `  ${k}: cũ=${oldC[k]} mới=${newC[k]}`).join('\n'));
  process.exitCode = diffs.length ? 1 : 0;
} finally {
  for (const f of ['_verify_old_gemini.ts', '_verify_entry_old.ts', '_verify_entry_new.ts']) rmSync(path.join(root, f), { force: true });
  rmSync(tmp, { recursive: true, force: true });
}
