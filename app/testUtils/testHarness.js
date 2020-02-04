import express from 'express';
import request from 'supertest';
import cheerio from 'cheerio';
import nunjucks from 'nunjucks';
import { App } from '../../app';

const testFunction = ({ setup, done }) => {
  const app = new App().createApp();
  const router = express.Router();

  const macroWrapper = `{% from './${setup.templateType}s/${setup.templateName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()}/macro.njk' import ${setup.templateName} %} {{ ${setup.templateName}(params) }}`;

  return {
    request: (context, callback) => {
      const dummyRouter = router.get('/', (req, res) => {
        const viewToTest = nunjucks.renderString(macroWrapper, context);
        res.send(viewToTest);
      });
      app.use(dummyRouter);

      request(app).get('/').then((response) => {
        callback(cheerio.load(response.text));
        done();
      });
    },
  };
};

export const createTestHarness = (setup, callback) => (done) => {
  callback(testFunction({
    setup,
    done,
  }));
};
