/* eslint-disable import/no-extraneous-dependencies */
// Core dependencies
const path = require('path');

// External dependencies
const compression = require('compression');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const dateFilter = require('nunjucks-date-filter');

// Local dependencies
const config = require('./config');
const locals = require('./locals');

class App {
  constructor() {
    // Initialise application
    this.app = express();
  }

  createApp() {
    // Use gzip compression to decrease the size of
    // the response body and increase the speed of web app
    this.app.use(compression());

    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(express.json());

    // Middleware to serve static assets
    this.app.use(express.static(path.join(__dirname, '/../public/')));
    this.app.use('/nhsuk-frontend', express.static(path.join(__dirname, '/../node_modules/nhsuk-frontend/packages')));

    // View engine (Nunjucks)
    this.app.set('view engine', 'njk');

    // Use local variables
    this.app.use(locals(config));

    // Nunjucks configuration
    const appViews = [
      __dirname,
      path.join(__dirname, '/../node_modules/nhsuk-frontend/packages/'),
      path.join(__dirname, '/../node_modules/govuk-frontend/govuk/'),
    ];

    const env = nunjucks.configure(appViews, {
      autoescape: true,
      express: this.app,
      noCache: true,
    });

    env.addFilter('dateTime', dateFilter);
    return this.app;
  }
}

module.exports = { App };
