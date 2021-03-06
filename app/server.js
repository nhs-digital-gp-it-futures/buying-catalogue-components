// eslint-disable-next-line import/no-extraneous-dependencies
const browserSync = require('browser-sync');
const routes = require('./routes');
const config = require('./config');
const { App } = require('./app');

// Routes
const app = new App().createApp();
app.use('/', routes);

// Run application on configured port
if (config.env === 'development') {
  app.listen(config.port - 50, () => {
    browserSync({
      files: ['app/views/**/*.*', 'public/**/*.*'],
      notify: true,
      open: false,
      port: config.port,
      proxy: `localhost:${config.port - 50}`,
      ui: false,
    });
  });
} else {
  app.listen(config.port);
}
