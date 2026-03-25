export interface RegistryComponent {
  name: 'button' | 'input' | 'card' | 'badge';
  description: string;
  templateDir: string;
  files: string[];
}

export const registryComponents: RegistryComponent[] = [
  {
    name: 'button',
    description: 'Interactive button with semantic variants and sizes.',
    templateDir: 'components/button',
    files: ['Button.tsx'],
  },
  {
    name: 'input',
    description: 'Form input with accessible focus treatment.',
    templateDir: 'components/input',
    files: ['Input.tsx'],
  },
  {
    name: 'card',
    description: 'Composable card primitives for sections and panels.',
    templateDir: 'components/card',
    files: ['Card.tsx'],
  },
  {
    name: 'badge',
    description: 'Compact status and label component.',
    templateDir: 'components/badge',
    files: ['Badge.tsx'],
  },
];
