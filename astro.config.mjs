import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // <--- Voltou para Vercel
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: vercel(), // <--- Adaptador correto
  integrations: [tailwind()],
});