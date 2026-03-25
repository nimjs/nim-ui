import type { DocPage } from '../types';

export const themingPage: DocPage = {
  slug: 'theming',
  title: 'Theming',
  description:
    'The theming layer starts from token primitives, maps them into semantic CSS variables, and keeps room for a future dark theme without forcing that complexity into every component today.',
  eyebrow: 'Design Tokens',
  sections: [
    {
      title: 'Token layers',
      paragraphs: [
        'Primitive colors live in the tokens package under brand, accent, neutral, and semantic groups. Applications consume semantic variables such as background, card, and primary instead of raw brand values.',
      ],
      codeBlocks: [
        {
          label: 'Semantic variables',
          language: 'css',
          code: `--background\n--foreground\n--card\n--card-foreground\n--muted\n--muted-foreground\n--border\n--input\n--primary\n--primary-foreground\n--secondary\n--secondary-foreground\n--accent\n--accent-foreground\n--ring\n--destructive\n--destructive-foreground`,
        },
      ],
    },
    {
      title: 'Why semantic mapping matters',
      paragraphs: [
        'Components can remain stable while visual direction changes, because the UI package refers to semantic roles rather than to individual brand colors. That lowers migration cost when the design language evolves.',
      ],
      list: [
        'No hardcoded color values in the docs app or component package',
        'Light theme is fully implemented',
        'Dark theme hook points are present through data-theme selectors',
      ],
    },
    {
      title: 'Tailwind integration',
      paragraphs: [
        'The docs app maps semantic CSS variables into Tailwind theme keys so component classes stay readable and designers can reason about usage at a glance.',
      ],
      codeBlocks: [
        {
          label: 'Tailwind color mapping',
          language: 'tsx',
          code: `colors: {\n  background: 'var(--background)',\n  foreground: 'var(--foreground)',\n  primary: 'var(--primary)',\n  'primary-foreground': 'var(--primary-foreground)'\n}`,
        },
      ],
    },
  ],
};
