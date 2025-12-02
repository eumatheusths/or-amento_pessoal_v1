import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel'; // <--- MUDANÇA AQUI (removemos o /serverless)
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: vercel(), // Garante que está usando o adaptador correto
  integrations: [tailwind()],
});