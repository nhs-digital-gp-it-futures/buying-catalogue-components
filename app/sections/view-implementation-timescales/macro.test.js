import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-implementation-timescales/macro.njk' import viewImplementationTimescales %}
                        {{ viewImplementationTimescales(params) }}`;

describe('view-implementation-timescales', () => {
  it('should render the title of the section', (done) => {
    const context = {
      params: {
        section: {
          answers: {
            description: 'Implementations without transition from another Catalogue Solution typically take 3-5 working days, the average is 4. The extent of your configuration requirements will have the greatest impact on these timescales. Your main responsibility will be configuration planning and approval.',
          },
        },
      },
    };

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
    const context = {
      params: {
        section: {
          answers: {
            description: 'Implementations without transition from another Catalogue Solution typically take 3-5 working days, the average is 4. The extent of your configuration requirements will have the greatest impact on these timescales. Your main responsibility will be configuration planning and approval.',
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-question-data-text-description"]').text().trim()).toEqual('Implementations without transition from another Catalogue Solution typically take 3-5 working days, the average is 4. The extent of your configuration requirements will have the greatest impact on these timescales. Your main responsibility will be configuration planning and approval.');

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
