/** @type {import("prettier").Config} */
const config = {
  // Core formatting options
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  endOfLine: "auto",

  // JSX specific options
  jsxSingleQuote: false,
  jsxBracketSameLine: false,

  // Arrow function parentheses
  arrowParens: "always",

  // Prose wrap
  proseWrap: "preserve",

  // HTML whitespace sensitivity
  htmlWhitespaceSensitivity: "css",

  // Vue files indentation
  vueIndentScriptAndStyle: false,

  // Embedded language formatting
  embeddedLanguageFormatting: "auto",

  // Override specific file types
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 120,
      },
    },
    {
      files: "*.md",
      options: {
        proseWrap: "always",
        printWidth: 100,
      },
    },
    {
      files: ["*.yaml", "*.yml"],
      options: {
        singleQuote: false,
        tabWidth: 2,
      },
    },
  ],

  // Plugins (uncomment if installed)
  plugins: [
    // "@trivago/prettier-plugin-sort-imports", // Alternative to simple-import-sort
  ],
};

module.exports = config;
