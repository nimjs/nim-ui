import {
  getRegistryComponent,
  type RegistryComponentManifest,
  type RegistryComponentName,
  type RegistryDependency,
  type RegistryTokenReference,
} from '@nim-ui/registry';

export interface CodeBlockContent {
  label: string;
  language: 'bash' | 'tsx' | 'css' | 'json';
  code: string;
}

export interface DocSection {
  title: string;
  paragraphs: string[];
  list?: string[];
  codeBlocks?: CodeBlockContent[];
}

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  sections: DocSection[];
}

export interface ComponentPage extends DocPage {
  manifest: RegistryComponentManifest;
  meta: ComponentDocMeta;
  preview: RegistryComponentName;
  code: string;
}

export interface ComponentDocMeta {
  title: string;
  description: string;
  tokens: RegistryTokenReference[];
  dependencies: RegistryDependency[];
  registry: RegistryComponentName;
}

export interface ComponentPageContent {
  slug: RegistryComponentName;
  eyebrow: string;
  preview: RegistryComponentName;
  code: string;
  sections: DocSection[];
}

export function defineComponentMeta(meta: ComponentDocMeta) {
  const manifest = getRegistryComponent(meta.registry);

  if (meta.dependencies.join('|') !== manifest.dependencies.join('|')) {
    throw new Error(
      `Component doc meta for "${meta.registry}" must mirror registry dependencies.`,
    );
  }

  if (meta.tokens.join('|') !== manifest.tokens.join('|')) {
    throw new Error(
      `Component doc meta for "${meta.registry}" must mirror registry tokens.`,
    );
  }

  return meta;
}

export function createComponentPage(
  meta: ComponentDocMeta,
  content: ComponentPageContent,
): ComponentPage {
  const manifest = getRegistryComponent(meta.registry);

  return {
    ...content,
    description: meta.description,
    manifest,
    meta,
    title: meta.title,
  };
}
