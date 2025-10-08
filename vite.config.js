import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      output: {
        entryFileNames: '[name].js',
        dir: 'dist',
        format: 'es',
        preserveModules: true,
        preserveModulesRoot : 'src',
      }
    },
  },
})
