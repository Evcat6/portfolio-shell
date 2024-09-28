import react from '@vitejs/plugin-react-swc'
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  const {
    VITE_TIMELINE_API_URL
  } = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api/timeline': {
          changeOrigin: true,
          target: VITE_TIMELINE_API_URL,
          rewrite: (path) => path.replace(/^\/api\/timeline/, ''),
        }
      }
    }
  })
}

export default config;
