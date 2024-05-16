import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve('./examples'),
  base: '/A8/',
  server: { port: 8080, open: '/' },
  define: {
    global: {},
  },
});
