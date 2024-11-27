import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.Config} */
export default {
  files: ["**/*.{js,mjs,cjs,ts}"], // Specify applicable file types
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  ignores: ["node_modules", "dist"], // Specify directories to ignore
  plugins: ["@typescript-eslint"], // Include the TypeScript ESLint plugin
  extends: [
    pluginJs.configs.recommended, // Use recommended JavaScript rules
    "plugin:@typescript-eslint/recommended", // Use recommended TypeScript rules
  ],
  rules: {
    "no-unused-vars": "off", // Disable the default JS rule
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }, // Allow `_` for unused variables
    ],
    "@typescript-eslint/no-explicit-any": "off", // Allow usage of `any`
  },
};
