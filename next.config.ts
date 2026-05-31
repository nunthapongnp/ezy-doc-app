import path from 'node:path';
import { loadEnvConfig } from '@next/env';
import type { NextConfig } from 'next';

// Load env from environment/ (e.g. environment/.env.development.local)
loadEnvConfig(path.join(process.cwd(), 'environment'));

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
