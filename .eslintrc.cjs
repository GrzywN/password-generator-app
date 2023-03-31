module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
  ],
  plugins: ["prettier", "tailwindcss"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.ts",
  },
  rules: {
    "prettier/prettier": [
    "error",
    {},
    {
      "usePrettierrc": true
    }
  ]
  },
};
