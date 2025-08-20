import js from '@eslint/js';
import globals from 'globals';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser, // TypeScript 파서 지정
      globals: globals.browser,
    },
    plugins: { js, react },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
      'no-unused-vars': 'warn', // 사용하지 않는 변수 경고
      'no-console': 'off', // console.log 허용
      'react/react-in-jsx-scope': 'off', // Next.js에서는 필요 없음
      'react/prop-types': 'off', // TS 사용 시 prop-types 불필요
      semi: ['error', 'always'], // 세미콜론 강제
      quotes: ['error', 'double'], // 큰따옴표 사용
      indent: ['error', 2], // 들여쓰기 2칸
    },
  },
]);
