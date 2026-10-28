import { readdir, readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { contentSecurityPolicy } from "./security-policy.mjs";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const documents = new Map();

async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") await inspect(file);
    } else if (entry.name.endsWith(".html")) {
      const group = documents.get(directory) ?? [];
      group.push(await readFile(file, "utf8"));
      documents.set(directory, group);
    }
  }
}

await inspect(root);
for (const [directory, pages] of documents) {
  const policy = contentSecurityPolicy(pages);
  if (policy.length > 7500) throw new Error(`Política de segurança muito grande em ${directory}.`);
  const security = `<IfModule mod_headers.c>\n  Header always set Content-Security-Policy "${policy}"\n</IfModule>\n`;
  const common = directory === root ? `# Gerado pelo build para hospedagem Apache/LiteSpeed (Hostinger).
DirectoryIndex index.html
AddDefaultCharset UTF-8
ErrorDocument 404 /404.html
Options -Indexes

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "DENY"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header set Cache-Control "public, max-age=0, must-revalidate"
</IfModule>

<FilesMatch "(^\\.ht|^\\.env|\\.map$)">
  Require all denied
</FilesMatch>

` : "# Política específica dos scripts desta página.\n";
  await writeFile(join(directory, ".htaccess"), common + security);
}

const assets = join(root, "_next", "static");
await mkdir(assets, { recursive: true });
await writeFile(join(assets, ".htaccess"), `<IfModule mod_headers.c>\n  Header set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n`);
const license = join(root, "fonts", "OFL.txt");
await mkdir(dirname(license), { recursive: true });
await copyFile(new URL("../src/app/fonts/OFL.txt", import.meta.url), license);
console.log(`Hostinger: .htaccess e hashes CSP gerados para ${documents.size} diretórios; licença da Manrope incluída.`);
