export interface NimUiUserConfig {
  componentsDir?: string;
  tokens?: boolean;
}

export interface NimUiResolvedConfig {
  componentsDir: string;
  configPath: string | null;
  tokens: boolean;
}
