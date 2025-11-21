import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone', // Importante para rodar sozinho na Hostinger
  }),
  integrations: [tailwind()],
});