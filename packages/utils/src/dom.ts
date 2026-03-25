export function canUseDOM() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function dataState(isActive: boolean) {
  return isActive ? 'active' : 'inactive';
}
