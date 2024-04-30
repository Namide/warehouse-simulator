/** @type {import('next').NextConfig} */

// development production
const PATH = process.env.NODE_ENV === 'production' ? '/warehouse-simulator' : ''

const nextConfig = {
  output: 'export',
  basePath: PATH,
  env: {
    PATH: PATH,
  },
};

export default nextConfig;
