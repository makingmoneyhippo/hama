#!/usr/bin/env node
import { access, readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { resolvePaths } from './paths.mjs';

async function main() {
  const { keyFile, mcpDir: defaultMcpDir } = resolvePaths();
  let key = process.env.KIPRIS_API_KEY;
  if (!key) {
    try {
      key = (await readFile(keyFile, 'utf8')).replace(/[\r\n]+$/, '');
    } catch {
      throw new Error('KIPRIS Plus 키 파일이 없습니다. save-api-key.mjs를 먼저 실행하세요.');
    }
  }
  if (!key) throw new Error('KIPRIS Plus 키가 비어 있습니다.');

  const mcpDir = process.env.COUPANG_IP_MCP_DIR || defaultMcpDir;
  const entry = path.join(mcpDir, 'build', 'index.js');
  try {
    await access(entry);
  } catch {
    throw new Error(`로컬 MCP 빌드가 없습니다: ${entry}`);
  }

  const child = spawn(process.execPath, [entry], {
    stdio: 'inherit',
    env: { ...process.env, KIPRIS_API_KEY: key },
  });
  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => child.kill(signal));
  }
  child.on('error', (error) => {
    process.stderr.write(`MCP 실행 실패: ${error.message}\n`);
    process.exitCode = 1;
  });
  child.on('exit', (code) => {
    process.exitCode = code ?? 1;
  });
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 78;
});
