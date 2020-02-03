import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const settingsContext = require('./settings.json');

const macroWrapper = `{% from './sections/view-implementation-timescales/macro.njk' import viewImplementationTimescales %}
                        {{ viewImplementationTimescales(params) }}`;

describe('view-implementation-timescales', () => {
  it('should render the title of the section', (done) => {
    const context = settingsContext;

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('h3').text().trim()).toEqual('Implementation timescales');
        done();
      });
  });

  it('should render the description answer when provided', (done) => {
    const context = settingsContext;

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-question-data-text-description"]').text().trim()).toEqual(context.params.section.answers.description);

        done();
      });
  });

  it('should not render the description answer when not provided', (done) => {
    const context = {
      params: {
        section: {
          answers: {},
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-question-data-text-description"]').length).toEqual(0);

        done();
      });
  });
});
