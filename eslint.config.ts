import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const config = [
  // Extends padrões do Next + TypeScript
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Ignorar pastas padrão
  {
    ignores: ['node_modules', '.next', 'out', 'build', 'next-env.d.ts']
  },

  // Plugin Prettier como regra de lint + configuração de aspas
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'none',
          printWidth: 100,
          endOfLine: 'lf'
        }
      ],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }]
    }
  },

  // Desabilita conflitos entre ESLint e Prettier
  prettierConfig
];

export default config;
