#!/usr/bin/env node
import { chmod, mkdir, rename, unlink, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import { resolvePaths } from './paths.mjs';

function readHiddenLine() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error('터미널에서 직접 실행하세요. API 키를 채팅이나 명령 인수에 입력하지 마세요.');
  }

  return new Promise((resolve, reject) => {
    const input = process.stdin;
    const wasRaw = Boolean(input.isRaw);
    let value = '';
    process.stdout.write('KIPRIS Plus API 키 입력: ');
    input.setRawMode(true);
    input.setEncoding('utf8');
    input.resume();

    const finish = (error) => {
      input.off('data', onData);
      input.setRawMode(wasRaw);
      input.pause();
      process.stdout.write('\n');
      if (error) reject(error);
      else resolve(value);
    };
    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === '\r' || char === '\n') return finish();
        if (char === '\u0003') return finish(new Error('입력을 취소했습니다.'));
        if (char === '\u007f' || char === '\b') value = value.slice(0, -1);
        else if (char >= ' ') value += char;
      }
    };
    input.on('data', onData);
  });
}

async function main() {
  const key = await readHiddenLine();
  if (!key.trim()) throw new Error('빈 키는 저장하지 않았습니다.');

  const { keyFile } = resolvePaths();
  const keyDir = path.dirname(keyFile);
  await mkdir(keyDir, { recursive: true, mode: 0o700 });
  if (process.platform !== 'win32') await chmod(keyDir, 0o700);

  const tempFile = path.join(keyDir, `.kipris-api-key.${process.pid}.${randomBytes(6).toString('hex')}`);
  try {
    await writeFile(tempFile, key, { encoding: 'utf8', mode: 0o600, flag: 'wx' });
    try {
      await rename(tempFile, keyFile);
    } catch (error) {
      if (process.platform !== 'win32' || !['EEXIST', 'EPERM'].includes(error.code)) throw error;
      const backupFile = path.join(keyDir, `.kipris-api-key.backup.${process.pid}.${randomBytes(6).toString('hex')}`);
      await rename(keyFile, backupFile);
      try {
        await rename(tempFile, keyFile);
      } catch (replaceError) {
        try {
          await rename(backupFile, keyFile);
        } catch {
          throw new Error(`새 키를 저장하지 못했습니다. 기존 키는 이 백업 파일에 있습니다: ${backupFile}`);
        }
        throw replaceError;
      }
      try {
        await unlink(backupFile);
      } catch {
        throw new Error(`새 키를 저장했지만 이전 키의 백업 파일을 지우지 못했습니다: ${backupFile}`);
      }
    }
    if (process.platform !== 'win32') await chmod(keyFile, 0o600);
  } finally {
    await unlink(tempFile).catch(() => {});
  }
  process.stdout.write('키를 사용자 전용 파일에 저장했습니다.\n');
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
