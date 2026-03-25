import { describe, expect, it } from 'vitest';

import { colorTokens } from './colors';
import { lightTheme } from './themes/light';

describe('lightTheme', () => {
  it('maps semantic colors from token primitives', () => {
    expect(lightTheme.semanticColors.primary).toBe(colorTokens.brand.redStrong);
    expect(lightTheme.semanticColors.background).toBe(colorTokens.neutral.white);
    expect(lightTheme.semanticColors.accentForeground).toBe(colorTokens.brand.deep);
  });
});
