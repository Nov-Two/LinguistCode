const { defineConfig } = require('cypress');
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/plugin');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);
    },
    baseUrl: 'http://localhost:5174',
  },
});
