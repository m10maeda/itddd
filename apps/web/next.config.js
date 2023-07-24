/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@itddd/ui'],
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'http://localhost:3334/graphql',
      },
    ];
  },
};
