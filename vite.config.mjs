import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const contactApiUrl = (env.VITE_CONTACT_API_URL || 'http://localhost:3000').replace(/\/+$/, '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: contactApiUrl,
          changeOrigin: true,
        },
      },
    },
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i.test(assetInfo.name ?? '')) {
              return 'assets/media/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
  };
});
