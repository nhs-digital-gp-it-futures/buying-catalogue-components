import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './components/view-section-heading/macro.njk' import viewSectionHeading %}
                            {{ viewSectionHeading(params) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};

describe('view-section-heading', () => {
  it('should render view-section-heading component', (done) => {
    const context = {};

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div').hasClass('bc-c-title-block')).toEqual(true);
        done();
      });
  });

  it('should render the view-section-heading with the correct text', (done) => {
    const context = {
      params: {
        text: 'Some section heading text',
      },
    };
    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('h3').text().trim()).toEqual('Some section heading text');
        done();
      });
  });
});
