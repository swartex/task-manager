import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [...compat.extends(
  "next",
  "plugin:@typescript-eslint/recommended",
  "plugin:jsx-a11y/recommended",
  "prettier" // Додаємо Prettier правильно
), {
  plugins: fixupPluginRules({
    react,
    "jsx-a11y": jsxA11Y,
    import: importPlugin,
  }),

  rules: {
    "import/order": ["error", {
      groups: ["builtin", "external", "internal", "parent", "sibling", "index"],

      pathGroups: [{
        pattern: "@/**",
        group: "external",
        position: "after",
      }],

      pathGroupsExcludedImportTypes: ["builtin"],
      "newlines-between": "always",

      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
    }],

    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",

    "max-len": ["error", {
      code: 100,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreComments: true,
      ignorePattern: "className=\".*\"",
    }],

    // Видаляємо "prettier/prettier", бо Prettier вже підключений правильно
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    "@typescript-eslint/no-explicit-any": "off",

    "@typescript-eslint/consistent-type-imports": ["error", {
      fixStyle: "inline-type-imports",
    }],
  },
}];
