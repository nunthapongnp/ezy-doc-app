import { defineCloudflareConfig, type OpenNextConfig } from '@opennextjs/cloudflare';

const cloudflareConfig = defineCloudflareConfig();

export default {
    ...cloudflareConfig,
    buildCommand: 'bun run build:next',
} satisfies OpenNextConfig;
