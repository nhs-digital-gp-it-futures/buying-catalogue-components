import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-expandable-section/macro.njk' import viewExpandableSection %}
                        {{ viewExpandableSection(params) }}`;

describe('view-expandable-section', () => {
  it('should render title of the expandable section', (done) => {
    const context = {
      params: {
        sectionId: 'some-section-id',
        sectionTitle: 'Some section title',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-section-some-section-id"]').text().trim()).toEqual('Some section title');

        done();
      });
  });

  it('should render innerComponent of the expandable section', (done) => {
    const context = {
      params: {
        sectionId: 'some-section-id',
        sectionTitle: 'Some section title',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-section-some-section-id"] p').text().trim()).toEqual('Some inner component');

        done();
      });
  });
});
