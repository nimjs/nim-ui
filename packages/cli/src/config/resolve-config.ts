import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { NimUiConfig } from './types';

const CONFIG_FILE_NAME = 'nim-ui.config.json';

export const defaultConfig: NimUiConfig = {
  registry: 'https://registry.example.com/nim-ui/manifest.json',
  componentsDir: 'src/components',
  style: 'default',
  tsx: true,
  tailwind: {
    config: 'tailwind.config.ts',
    css: 'src/app/globals.css',
    cssVariables: true,
  },
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
  },
};

export function resolveConfig(cwd: string): NimUiConfig {
  const configPath = join(cwd, CONFIG_FILE_NAME);

  if (!existsSync(configPath)) {
    return defaultConfig;
  }

  const fileContents = readFileSync(configPath, 'utf8');
  const parsed = JSON.parse(fileContents) as Partial<NimUiConfig>;

  return {
    ...defaultConfig,
    ...parsed,
    tailwind: {
      ...defaultConfig.tailwind,
      ...parsed.tailwind,
    },
    aliases: {
      ...defaultConfig.aliases,
      ...parsed.aliases,
    },
  };
}

export { CONFIG_FILE_NAME };
