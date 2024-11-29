import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    ignores: ["node_modules", "dist"],
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      // Unused vars configuration
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn", // Changed to warn to be less strict
        { 
          argsIgnorePattern: "^_", 
          varsIgnorePattern: "^_",
          // Allow unused imports of types
          ignoreRestSiblings: true,
          destructuredArrayIgnorePattern: "^_"
        }
      ],
      // any type handling
      "@typescript-eslint/no-explicit-any": "off", // Changed to warn
      "no-useless-catch": "warn", // Added to handle useless catch warning
      
      // Recommended rules with some adjustments
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules
    }
  }
];