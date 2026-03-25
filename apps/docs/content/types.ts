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
  preview: 'button' | 'input' | 'card' | 'badge';
  code: string;
}
