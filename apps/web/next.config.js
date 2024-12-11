/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
};

export default nextConfig;
