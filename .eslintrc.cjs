module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "simple-import-sort", "unused-imports"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          { target: "./src/shared", from: "./src/entities" },
          { target: "./src/shared", from: "./src/features" },
          { target: "./src/shared", from: "./src/widgets" },
          { target: "./src/shared", from: "./src/app" },
          { target: "./src/entities", from: "./src/features" },
          { target: "./src/entities", from: "./src/widgets" },
          { target: "./src/entities", from: "./src/app" },
          { target: "./src/features", from: "./src/widgets" },
          { target: "./src/features", from: "./src/app" },
          { target: "./src/widgets", from: "./src/app" },
        ],
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: [
              "@/entities/*/!(client)",
              "@/entities/*/!(client)/**",
              "@/features/*/!(client)",
              "@/features/*/!(client)/**",
              "@/widgets/*/!(client)",
              "@/widgets/*/!(client)/**",
            ],
            message: "Use the slice public API (index.ts or client.ts).",
          },
        ],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
};
