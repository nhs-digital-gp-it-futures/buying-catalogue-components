import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-data-title/macro.njk' import viewDataTitle %}
                          {{ viewDataTitle(params) }}`;

describe('view-data-title', () => {
  it('should render the title', (done) => {
    const context = {
      params: {
        dataTestIdIdentifier: 'some-test-identifier',
        title: 'Some question title',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="some-test-identifier"]').text().trim()).toEqual('Some question title');

        done();
      });
  });
});
