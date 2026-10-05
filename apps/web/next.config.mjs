import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..'),
  experimental: { cpus: 2 },
  transpilePackages: [
    '@govcalc/types',
    '@govcalc/ui',
    '@govcalc/validation',
    '@govcalc/calculators',
    '@govcalc/config',
    'tailwind-merge',
    'clsx',
  ],
  poweredByHeader: false,
};

export default nextConfig;
