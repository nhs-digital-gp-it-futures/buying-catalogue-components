import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-data-text/macro.njk' import viewDataText %}
                        {{ viewDataText(params) }}`;

describe('view-data-text', () => {
  it('should render the data when provided', (done) => {
    const context = {
      params: {
        dataTestIdIdentifier: 'some-test-identifier',
        data: 'Some question data',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="some-test-identifier"]').text().trim()).toEqual('Some question data');

        done();
      });
  });

  it('should not render the data when not provided', (done) => {
    const context = {
      params: {
        dataTestIdIdentifier: 'some-test-identifier',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id^="some-test-identifier"]').length).toEqual(0);

        done();
      });
  });
});
