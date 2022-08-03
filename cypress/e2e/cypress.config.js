const { defineConfig } = require("cypress");

module.exports = defineConfig({
  backendUrl: "http://localhost:4000",
  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
