import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-question-data-bulletlist/macro.njk' import viewQuestionDataBulletlist %}
                        {{ viewQuestionDataBulletlist(params) }}`;

describe('view-question-data-bulletlist', () => {
  it('should render the data of the question as a list when provided', (done) => {
    const context = {
      params: {
        questionData: [
          'Some first data',
          'Some second data',
          'Some third data',
        ],
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="view-question-data-bulletlist"] ul').length).toEqual(1);
        expect($('[data-test-id="view-question-data-bulletlist"] li').length).toEqual(3);

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

        expect($('[data-test-id="view-question-data-bulletlist"]').length).toEqual(0);

        done();
      });
  });
});
