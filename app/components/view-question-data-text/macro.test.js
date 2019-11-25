import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-question-data-text/macro.njk' import viewQuestionDataText %}
                        {{ viewQuestionDataText(params) }}`;

describe('view-question-data-text', () => {
  it('should render the data when provided', (done) => {
    const context = {
      params: {
        questionId: 'someId',
        questionData: 'Some question data',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-question-data-text-someId"]').text().trim()).toEqual('Some question data');

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

        expect($('[data-test-id^="view-question-data-text"]').length).toEqual(0);

        done();
      });
  });
});
