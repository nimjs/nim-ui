import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('merges conflicting tailwind utilities', () => {
    const optionalClass = undefined;

    expect(cn('px-2 py-2', 'px-4', optionalClass)).toBe('py-2 px-4');
  });
});
