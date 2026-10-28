import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { constants } from "node:os";
import { rm } from "node:fs/promises";

// A exportação deve conter somente as rotas atuais, sem artigos de builds antigos.
if (process.argv[2] === "build") await rm(new URL("../out/", import.meta.url), { recursive: true, force: true });

const require = createRequire(import.meta.url);
const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), ...process.argv.slice(2)], {
  stdio: "inherit",
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
});
for (const signal of ["SIGINT", "SIGTERM"]) process.once(signal, () => child.kill(signal));
child.once("error", () => { console.error("Não foi possível iniciar o Next.js."); process.exitCode = 1; });
child.once("exit", (code, signal) => { process.exitCode = code ?? (signal ? 128 + (constants.signals[signal] ?? 1) : 1); });
