export interface NimUiConfig {
  registry: string;
  componentsDir: string;
  style: 'default';
  tsx: boolean;
  tailwind: {
    config: string;
    css: string;
    cssVariables: boolean;
  };
  aliases: {
    components: string;
    utils: string;
  };
}
