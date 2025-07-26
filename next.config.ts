import type { NextConfig } from 'next';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const baseConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },

};

export default withNextIntl(baseConfig);
