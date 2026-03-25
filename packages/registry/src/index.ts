import badgeManifestJson from '../components/badge.json';
import buttonManifestJson from '../components/button.json';
import cardManifestJson from '../components/card.json';
import inputManifestJson from '../components/input.json';

import {
  componentNames,
  registryCategories,
  registryTokenReferences,
  systemDependencies,
  type RegistryCategory,
  type RegistryComponentManifest,
  type RegistryComponentName,
  type RegistryDependency,
  type RegistrySystemDependency,
  type RegistryTokenReference,
} from './types';

const componentNameSet = new Set<string>(componentNames);
const categorySet = new Set<string>(registryCategories);
const tokenSet = new Set<string>(registryTokenReferences);
const systemDependencySet = new Set<string>(systemDependencies);

function isComponentName(value: string): value is RegistryComponentName {
  return componentNameSet.has(value);
}

function isRegistryDependency(value: string): value is RegistryDependency {
  return isComponentName(value) || systemDependencySet.has(value);
}

function isRegistryCategory(value: string): value is RegistryCategory {
  return categorySet.has(value);
}

function isRegistryTokenReference(
  value: string,
): value is RegistryTokenReference {
  return tokenSet.has(value);
}

function assertStringArray(
  label: string,
  value: unknown,
): asserts value is string[] {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string')) {
    throw new Error(`Registry manifest "${label}" must be an array of strings.`);
  }
}

function parseManifest(raw: unknown): RegistryComponentManifest {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Registry manifest must be an object.');
  }

  const manifest = raw as Partial<RegistryComponentManifest>;

  if (!manifest.name || !isComponentName(manifest.name)) {
    throw new Error(`Unknown registry component name: ${String(manifest.name)}`);
  }

  assertStringArray(`${manifest.name}.files`, manifest.files);
  assertStringArray(`${manifest.name}.dependencies`, manifest.dependencies);
  assertStringArray(`${manifest.name}.tokens`, manifest.tokens);

  if (!manifest.category || !isRegistryCategory(manifest.category)) {
    throw new Error(
      `Unknown registry category for "${manifest.name}": ${String(
        manifest.category,
      )}`,
    );
  }

  if (!manifest.description || typeof manifest.description !== 'string') {
    throw new Error(`Registry manifest "${manifest.name}" must include description.`);
  }

  const invalidDependencies = manifest.dependencies.filter(
    (dependency) => !isRegistryDependency(dependency),
  );
  const invalidTokens = manifest.tokens.filter(
    (token) => !isRegistryTokenReference(token),
  );

  if (invalidDependencies.length > 0) {
    throw new Error(
      `Registry manifest "${manifest.name}" has invalid dependencies: ${invalidDependencies.join(
        ', ',
      )}`,
    );
  }

  if (invalidTokens.length > 0) {
    throw new Error(
      `Registry manifest "${manifest.name}" has invalid tokens: ${invalidTokens.join(
        ', ',
      )}`,
    );
  }

  return {
    category: manifest.category,
    dependencies: manifest.dependencies,
    description: manifest.description,
    files: manifest.files,
    name: manifest.name,
    tokens: manifest.tokens,
  };
}

export const registryComponents = [
  parseManifest(buttonManifestJson),
  parseManifest(inputManifestJson),
  parseManifest(cardManifestJson),
  parseManifest(badgeManifestJson),
];

export const registryComponentsByName = Object.fromEntries(
  registryComponents.map((component) => [component.name, component]),
) as Record<RegistryComponentName, RegistryComponentManifest>;

export function getRegistryComponent(
  name: RegistryComponentName,
): RegistryComponentManifest {
  return registryComponentsByName[name];
}

export function listRegistryComponents() {
  return [...registryComponents];
}

export function isSystemDependency(
  dependency: RegistryDependency,
): dependency is RegistrySystemDependency {
  return systemDependencySet.has(dependency);
}

export type {
  RegistryCategory,
  RegistryComponentManifest,
  RegistryComponentName,
  RegistryDependency,
  RegistrySystemDependency,
  RegistryTokenReference,
} from './types';
