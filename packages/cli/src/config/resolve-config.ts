import { existsSync } from 'node:fs';
import { join } from 'node:path';

import jiti from 'jiti';

import type { NimUiResolvedConfig, NimUiUserConfig } from './types';

export const CONFIG_FILE_NAMES = [
  'nim-ui.config.ts',
  'nim-ui.config.mts',
  'nim-ui.config.js',
  'nim-ui.config.mjs',
] as const;

export const defaultConfig: NimUiResolvedConfig = {
  componentsDir: 'src/components/ui',
  configPath: null,
  tokens: true,
};

function findConfigPath(cwd: string) {
  return (
    CONFIG_FILE_NAMES.map((fileName) => join(cwd, fileName)).find((filePath) =>
      existsSync(filePath),
    ) ?? null
  );
}

function validateConfig(config: NimUiUserConfig, configPath: string) {
  if (
    config.componentsDir !== undefined &&
    (typeof config.componentsDir !== 'string' || config.componentsDir.trim() === '')
  ) {
    throw new Error(
      `Invalid nim-ui config at ${configPath}: "componentsDir" must be a non-empty string.`,
    );
  }

  if (config.tokens !== undefined && typeof config.tokens !== 'boolean') {
    throw new Error(
      `Invalid nim-ui config at ${configPath}: "tokens" must be a boolean.`,
    );
  }
}

export async function resolveConfig(cwd: string): Promise<NimUiResolvedConfig> {
  const configPath = findConfigPath(cwd);

  if (!configPath) {
    return defaultConfig;
  }

  const load = jiti(cwd, {
    interopDefault: true,
    moduleCache: false,
  });
  const loaded = (await load.import(configPath)) as NimUiUserConfig;

  validateConfig(loaded, configPath);

  return {
    componentsDir: loaded.componentsDir ?? defaultConfig.componentsDir,
    configPath,
    tokens: loaded.tokens ?? defaultConfig.tokens,
  };
}
