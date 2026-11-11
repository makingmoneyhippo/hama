import os from 'node:os';
import path from 'node:path';

export function resolvePaths(platform = process.platform, env = process.env, home = os.homedir()) {
  const configBase = env.XDG_CONFIG_HOME || (platform === 'win32'
    ? env.APPDATA || path.join(home, 'AppData', 'Roaming')
    : path.join(home, '.config'));
  const dataBase = env.XDG_DATA_HOME || (platform === 'win32'
    ? env.LOCALAPPDATA || path.join(home, 'AppData', 'Local')
    : path.join(home, '.local', 'share'));

  return {
    keyFile: path.join(configBase, 'coupang-ip-check', 'kipris-api-key'),
    mcpDir: path.join(dataBase, 'coupang-ip-check', 'korean-patent-mcp'),
  };
}
