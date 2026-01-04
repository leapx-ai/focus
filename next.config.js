/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 只有在GitHub Pages环境下才添加basePath
  basePath: process.env.GITHUB_ACTIONS ? '/focus' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/focus/' : '',
};

export default nextConfig;
