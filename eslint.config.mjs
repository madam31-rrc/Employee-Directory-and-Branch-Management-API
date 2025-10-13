// eslint.config.mjs
export default [
  // Basic JS/TS parser settings
  {
    files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin")
    },
    rules: {
      // Helpful defaults (feel free to tune)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off"
    },
    ignores: ["node_modules/**", "dist/**"]
  },

  // Recommended extends (TypeScript + Prettier)
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser"
    },
    // Use the recommended set from the plugin and Prettier
    extends: [
      "plugin:@typescript-eslint/recommended",
      "prettier"
    ],
    rules: {
      // Example TS rules (adjust if you want stricter)
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  }
];
