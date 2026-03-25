/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@nim-ui/registry',
    '@nim-ui/tokens',
    '@nim-ui/ui',
    '@nim-ui/utils',
  ],
};

export default nextConfig;
