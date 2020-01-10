import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-section-heading/macro.njk' import viewSectionHeading %}
                        {{ viewSectionHeading(params) }}`;

describe('view-section-heading', () => {
  it('should render view-section-heading component', (done) => {
    const context = {};

    const dummyApp = createTestHarness(macroWrapper, context);
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
        dataTestIdIdentifier: 'some-data-identifier',
        text: 'Some section heading text',
      },
    };
    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="some-data-identifier"]').text().trim()).toEqual('Some section heading text');

        done();
      });
  });

  it('should add classes provided within the params', (done) => {
    const context = {
      params: {
        dataTestIdIdentifier: 'some-data-identifier',
        text: 'Some section heading text',
        classes: 'new-class another-class',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('new-class')).toEqual(true);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('another-class')).toEqual(true);

        done();
      });
  });
});
