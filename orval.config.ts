import { defineConfig } from 'orval';

export default defineConfig({
  'api': {
    input: {
      target: './src/api/schema.json',
    },
    output: {
      mode: 'split',
      target: './src/api/generated',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});