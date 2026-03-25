import { describe, expect, it } from 'vitest';

import {
  getRegistryComponent,
  listRegistryComponents,
  registryComponentsByName,
} from './index';

describe('registry', () => {
  it('loads all baseline component manifests', () => {
    expect(listRegistryComponents()).toHaveLength(4);
    expect(getRegistryComponent('button').dependencies).toContain('tokens');
    expect(registryComponentsByName.input.tokens).toContain('input');
  });
});
