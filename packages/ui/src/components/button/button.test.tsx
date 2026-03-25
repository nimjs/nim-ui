import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renders accessible button text', () => {
    render(<Button>Launch</Button>);
    expect(
      screen.getByRole('button', {
        name: 'Launch',
      }),
    ).toBeInTheDocument();
  });
});
