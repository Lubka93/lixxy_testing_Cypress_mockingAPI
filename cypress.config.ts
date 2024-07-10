import { defineConfig } from "cypress";
//verify download import
const {verifyDownloadTasks } = require('cy-verify-downloads');

//Excel stuff which we need if I want to integrate it  //integrated library
const xlsx = require("node-xlsx").default;
const fs = require("fs"); // for file
const path = require("path"); //for file path

//MySQL library declaration
//const mysql = require("mysql");
 const mysql = require('mysql2')


export default defineConfig({
  retries: {            // for flaky tests .. based on the run/open mode it will GLOBALLY try to run test 2 or 3 times
    runMode: 2,
    openMode:0,
  },
  e2e: {
   // baseUrl: "http://www.uitestingplayground.com",
    setupNodeEvents(on, config) {
      //--------------verify download import
      on('task', verifyDownloadTasks);

      //----- task for Excel
      on("task", {
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }
          });
        }
      });

      //------------MySQL implementation
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config)
        }
      });


      //----------------------for mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      //-----------------
    },
    env: {
      baseURL: 'https://lixxy-webpack-n76b.vercel.app',
      error: 'https://the-internet.herokuapp.com',
      broken: 'https://the-internet.herokuapp.com',
      db:{
        host: "localhost",
        user: "root",
        password: "123",
        database: "cypress_test",
        port: 3307,
      },
    },
    projectId: "uenrzx",
   // specPattern: 'cypress/e2e/**/*.cy.ts',
  },
 
  pageLoadTimeout: 7000,    //optional .. I can change it ...these are global configurations
  defaultCommandTimeout: 5000,
  viewportHeight: 1000,   //optional
  viewportWidth: 1200,    //optional
  reporter: 'cypress-mochawesome-reporter', // how I want to prepare reports
  reporterOptions: {                    // to customize reporter
    charts: true,
    reportPageTitle: 'TrackMyCals report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  video:false,       //for automatic sceenshots
  screenshotOnRunFailure:false,      //for automatic videos
});


function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db);
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
         console.log(results)
        return resolve(results);
      }
    });
  });
}
