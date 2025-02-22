import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base : 'Blog',
    build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  // Hook to generate 404.html
  buildEnd: () => {
    fs.copyFileSync('dist/index.html', 'dist/404.html');
  }
});

