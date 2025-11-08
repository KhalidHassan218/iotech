import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // Legacy configs using compat
  ...compat.config({
    extends: [
      "next",
      "next/core-web-vitals",
      "next/typescript",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "plugin:promise/recommended",
      "prettier", // Must be last to override other configs
      // "plugin:@tanstack/query/recommended",
    ],
    plugins: [
      "@typescript-eslint",
      "react",
      "react-hooks",
      "react-refresh",
      "jsx-a11y",
      "import",
      "simple-import-sort",
      "unused-imports",
      "prefer-arrow",
      "prettier",
      "promise",
    ],
  }),

  // Global configuration for TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: true,
      },
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true,
          singleQuote: false,
          trailingComma: "es5",
          tabWidth: 2,
          useTabs: false,
          printWidth: 80,
          endOfLine: "auto",
        },
        {
          usePrettierrc: true,
        },
      ],
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": "off", // handled by unused-imports
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // React specific rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/self-closing-comp": "error",
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: "last",
          reservedFirst: true,
        },
      ],

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React Refresh rules (for development)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Import/Export rules
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React and Next.js imports first
            ["^react", "^next"],
            // Node.js builtins
            ["^node:"],
            // Packages starting with a letter (or digit or underscore), or `@` followed by a letter
            ["^@?\\w"],
            // Internal packages
            ["^(@|~)/"],
            // Side effect imports
            ["^\\u0000"],
            // Parent imports. Put `..` last
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-unresolved": "error",
      "import/no-cycle": "error",
      "import/no-self-import": "error",

      // Unused imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Arrow function preference
      "prefer-arrow/prefer-arrow-functions": [
        "error",
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],

      // Accessibility rules
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],

      // Promise rules
      "promise/prefer-await-to-then": "error",
      "promise/prefer-await-to-callbacks": "error",

      // General JavaScript/TypeScript rules
      "no-console": "error",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-alert": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "object-shorthand": "error",
      "no-duplicate-imports": "error",
      "no-undef": "off", // TypeScript handles this
      "max-lines": [
        "error",
        { max: 350, skipBlankLines: true, skipComments: true },
      ],
    },
  },

  // JavaScript files configuration (no TypeScript parser)
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      // Prettier integration for JS files - disable semicolon enforcement

      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "prefer-arrow/prefer-arrow-functions": "off",
      "no-console": "off",
      "import/no-anonymous-default-export": "off",
    },
  },

  // Test files
  {
    files: ["**/*.test.*", "**/*.spec.*"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "prefer-arrow/prefer-arrow-functions": "off",
      "no-console": "off",
    },
  },

  // Config files (disable strict rules)
  {
    files: [
      "*.config.*",
      "next.config.*",
      "postcss.config.*",
      "prettier.config.*",
      ".prettierrc.*",
      "eslint.config.*",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "import/no-anonymous-default-export": "off",
      "prefer-arrow/prefer-arrow-functions": "off",
      // Disable prettier for config files to avoid conflicts
      "prettier/prettier": "off",
    },
  },

  // Ignore patterns
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      ".turbo/**",
      "coverage/**",
      "public/**",
      "next.config.ts",
      "instrumentation-client.ts",
      "sentry.edge.config.ts",
      "sentry.server.config.ts",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
