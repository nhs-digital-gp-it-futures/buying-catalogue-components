import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-client-application-types/macro.njk' import viewClientApplicationTypes %}
                        {{ viewClientApplicationTypes(params) }}`;

describe('view-client-application-types', () => {
  it('should render the title of the section', (done) => {
    const context = {
      params: {
        section: {},
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('h3').text().trim()).toEqual('Client application type');

        done();
      });
  });

  it('should not render the client-application-types section when not provided', (done) => {
    const context = {
      params: {},
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-client-application-types"]').length).toEqual(0);

        done();
      });
  });

  describe('when a sub section exists for an application type', () => {
    it('should render the browsed based application type', (done) => {
      const context = {
        params: {
          section: {
            sections: {
              'browser-based': {},
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);


          const browserBasedExpandableSection = $('[data-test-id="view-section-browser-based"]');
          const browserBasedSection = browserBasedExpandableSection.find('[data-test-id="view-section-table-browser-based"]');

          expect(browserBasedExpandableSection.length).toEqual(1);
          expect(browserBasedSection.length).toEqual(1);

          done();
        });
    });
  });

  describe('when a sub section does not exist for an application type', () => {
    it('should not render the browsed based application type', (done) => {
      const context = {
        params: {
          section: {
            sections: {
              'some-other-section': {
                answers: {
                  'some-question': 'Some data',
                },
              },
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          const browserBasedExpandableSection = $('[data-test-id="view-section-browser-based"]');

          expect(browserBasedExpandableSection.length).toEqual(0);

          done();
        });
    });
  });
});
