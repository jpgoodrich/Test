import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        globals: { crypto: 'crypto' },
      },
      external: ['crypto'],
      plugins: [nodeResolve({ preferBuiltins: true })],
    },
  },
})
