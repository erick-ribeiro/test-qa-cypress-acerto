const { defineConfig } = require("cypress");

module.exports = defineConfig({

  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/report/mochawesome-report",
    "overwrite": true,
    "html": true,
    "json": false,
    "timestamp": "mmddyyyy_HHMMss"
    },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/*/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: "https://buger-eats.vercel.app"
  },
});
