import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-expandable-section/macro.njk' import viewExpandableSection %}
                        {{ viewExpandableSection(params) }}`;

describe('view-expandable-section', () => {
  it('should render title of the expandable section', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        title: 'Some section title',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="some-data-identifier"]').text().trim()).toEqual('Some section title');

        done();
      });
  });

  it('should render innerComponent of the expandable section', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        title: 'Some section title',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="some-data-identifier"] p').text().trim()).toEqual('Some inner component');

        done();
      });
  });

  it('should add classes provided within the params', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        title: 'Some title',
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
