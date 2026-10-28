import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const patterns = [
  ["Chave privada", new RegExp("-".repeat(5) + "BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY" + "-".repeat(5))],
  ["Token GitHub", /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/],
  ["Chave AWS", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ["Chave de API com prefixo conhecido", /\b(?:sk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{32,}|sk_live_[A-Za-z0-9]{20,})\b/],
  ["Credencial em URL", /https?:\/\/[^\s/:"']+:[^\s/@"']+@/],
  ["Credencial literal", /\b(?:api[_-]?key|access[_-]?token|password|private[_-]?key)\s*[:=]\s*["'][A-Za-z0-9_+/=-]{16,}["']/i],
];

function git(args, options = {}) {
  try {
    return execFileSync("git", args, { maxBuffer: 4_000_000, ...options });
  } catch {
    // Erros de subprocesso podem carregar stdout com conteúdo sensível; não propagá-los.
    throw new Error(`Auditoria incompleta: não foi possível executar git ${args[0]}. Verifique as permissões locais.`);
  }
}

function findings(buffer) {
  if (buffer.includes(0)) return [];
  const text = buffer.toString("utf8");
  return patterns.filter(([, pattern]) => pattern.test(text)).map(([name]) => name);
}

const matches = [];
let files = 0;
const workingFiles = git(["ls-files", "--cached", "--others", "--exclude-standard", "-z"]).toString().split("\0").filter(Boolean);
for (const file of workingFiles) {
  const found = findings(await readFile(file));
  files++;
  if (found.length) matches.push({ source: file, patterns: found });
}
const objects = git(["rev-list", "--objects", "--all"]).toString().trim().split("\n");
const names = new Map(objects.map(line => { const split = line.indexOf(" "); return split < 0 ? [line, ""] : [line.slice(0, split), line.slice(split + 1)]; }));
const info = git(["cat-file", "--batch-check=%(objectname) %(objecttype) %(objectsize)"], { input: [...names.keys()].join("\n") + "\n" }).toString().trim().split("\n");
let blobs = 0;
for (const line of info) {
  const [id, type, size] = line.split(" ");
  if (type !== "blob") continue;
  if (Number(size) > 2_000_000) throw new Error(`Blob grande exige revisão separada: ${names.get(id)} (${id.slice(0, 12)}).`);
  const found = findings(git(["cat-file", "blob", id]));
  blobs++;
  if (found.length) matches.push({ source: `histórico:${names.get(id)}:${id.slice(0, 12)}`, patterns: found });
}
let exportFiles = 0;
async function inspectExport(directory) {
  let entries;
  try { entries = await readdir(directory, { withFileTypes: true }); }
  catch (error) { if (error.code === "ENOENT" && directory === "out") return; throw error; }
  for (const entry of entries) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await inspectExport(file);
    else if (entry.isFile()) {
      const found = findings(await readFile(file));
      exportFiles++;
      if (found.length) matches.push({ source: `exportação:${file}`, patterns: found });
    }
  }
}
await inspectExport("out");
// Somente nomes de arquivo e tipos de achado; valores de credenciais nunca são impressos.
console.log(JSON.stringify({ workingFiles: files, historicalBlobs: blobs, exportFiles, findings: matches }, null, 2));
if (matches.length) process.exitCode = 1;
