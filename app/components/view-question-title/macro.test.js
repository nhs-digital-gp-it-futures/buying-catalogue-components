import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness'

const macroWrapper = `{% from './components/view-question-title/macro.njk' import viewQuestionTitle %}
                          {{ viewQuestionTitle(params) }}`;

describe('view-question-title', () => {

  it('should render the title of the question', (done) => {
    const context = {
      params: {
        questionTitle: 'Some question title',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-question-title"]').text().trim()).toEqual('Some question title');

        done();
      });
  });
});
