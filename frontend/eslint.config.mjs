import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node,
        jest: true,
      },
      parserOptions: { 
        ecmaFeatures: { 
          jsx: true, 
        }, 
        ecmaVersion: 2021, 
        sourceType: 'module', 
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  { files: ["**/*.test.js"], 
    plugins: {
      jest: pluginJest,
    }, 
    languageOptions: { 
      globals: { 
        jest: true,
        test: "readonly",
        expect: "readonly"
      }, 
    }, 
    rules: {
      ...pluginJest.configs.recommended.rules,
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "warn",
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];