export const registryCategories = ['ui', 'forms', 'charts', 'layouts'] as const;
export const systemDependencies = ['utils', 'tokens'] as const;
export const componentNames = ['button', 'input', 'card', 'badge'] as const;
export const registryTokenReferences = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'muted',
  'muted-foreground',
  'border',
  'input',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'accent',
  'accent-foreground',
  'ring',
  'destructive',
  'destructive-foreground',
  'radius',
] as const;

export type RegistryCategory = (typeof registryCategories)[number];
export type RegistryComponentName = (typeof componentNames)[number];
export type RegistrySystemDependency = (typeof systemDependencies)[number];
export type RegistryDependency =
  | RegistrySystemDependency
  | RegistryComponentName;
export type RegistryTokenReference = (typeof registryTokenReferences)[number];

export interface RegistryComponentManifest {
  name: RegistryComponentName;
  files: string[];
  dependencies: RegistryDependency[];
  tokens: RegistryTokenReference[];
  category: RegistryCategory;
  description: string;
}
