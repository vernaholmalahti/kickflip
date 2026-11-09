// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  // Runs Prettier as a lint rule and turns off ESLint rules that clash with it.
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*', '.expo/*', 'coverage/*'],
  },
]);
