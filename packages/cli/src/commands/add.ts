import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { resolveConfig } from '../config/resolve-config';
import { error, log } from '../lib/output';
import { registryComponents } from '../registry/components';

function resolveTemplateRoot() {
  const currentFile = fileURLToPath(import.meta.url);
  const distTemplates = join(dirname(currentFile), '..', 'templates');

  if (existsSync(distTemplates)) {
    return distTemplates;
  }

  return join(dirname(currentFile), '..', '..', 'src', 'templates');
}

export function runAdd(cwd: string, componentName?: string) {
  if (!componentName) {
    error('Missing component name. Example: nim-ui add button');
    process.exitCode = 1;
    return;
  }

  const match = registryComponents.find(
    (component) => component.name === componentName,
  );

  if (!match) {
    error(
      `Unknown component "${componentName}". Available: ${registryComponents
        .map((component) => component.name)
        .join(', ')}`,
    );
    process.exitCode = 1;
    return;
  }

  const config = resolveConfig(cwd);
  const outputDir = join(cwd, config.componentsDir, componentName);
  const templateRoot = resolveTemplateRoot();

  mkdirSync(outputDir, { recursive: true });

  for (const fileName of match.files) {
    const templatePath = join(templateRoot, match.templateDir, `${fileName}.template`);
    const destinationPath = join(outputDir, fileName);

    if (!existsSync(templatePath)) {
      error(`Template not found for ${componentName}: ${templatePath}`);
      process.exitCode = 1;
      return;
    }

    copyFileSync(templatePath, destinationPath);
    log(`Created ${destinationPath}`);
  }

  log(`Added ${componentName} from the local registry foundation.`);
}
