import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // <--- MUDOU AQUI
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: vercel(), // <--- E AQUI
  integrations: [tailwind()],
});