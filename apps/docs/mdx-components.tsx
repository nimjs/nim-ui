import type * as React from 'react';

export function useMDXComponents(
  components: Record<string, React.ComponentType<unknown>>,
) {
  return {
    ...components,
  };
}
