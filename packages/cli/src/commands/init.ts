import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { CONFIG_FILE_NAME, defaultConfig } from '../config/resolve-config';
import { log } from '../lib/output';

export function runInit(cwd: string) {
  const destination = join(cwd, CONFIG_FILE_NAME);

  if (existsSync(destination)) {
    log(`Config already exists at ${CONFIG_FILE_NAME}.`);
    return;
  }

  writeFileSync(destination, `${JSON.stringify(defaultConfig, null, 2)}\n`, 'utf8');

  log(`Created ${CONFIG_FILE_NAME}`);
  log('Next steps:');
  log('1. Adjust aliases and Tailwind paths to match your app.');
  log('2. Run `nim-ui add button` to scaffold a first component template.');
}
