import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-question-data-link/macro.njk' import viewQuestionDataLink %}
                        {{ viewQuestionDataLink(params) }}`;


describe('view-question-link', () => {
  it('should render the link when provided', (done) => {
    const context = {
      params: {
        questionData: 'www.somelink.com',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-question-data-link"] a').text().trim()).toEqual('www.somelink.com');
        expect($('[data-test-id="view-question-data-link"] a').attr('href')).toEqual('www.somelink.com');

        done();
      });
  });

  it('should not render the data when not provided', (done) => {
    const context = {};

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-question-data-link"]').length).toEqual(0);

        done();
      });
  });
});
