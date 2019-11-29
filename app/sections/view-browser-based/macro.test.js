import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-browser-based/macro.njk' import viewBrowserBased %}
                        {{ viewBrowserBased(params) }}`;

describe('view-browser-based', () => {
  it('should render the supported browsers answer', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'browsers-supported': {
              answers: {
                'supported-browsers': ['chrome'],
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

        const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
        const supportedBrowserQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-supported-browsers"]');

        expect(browserBasedSectionTable.length).toEqual(1);
        expect(supportedBrowserQuestionRow.length).toEqual(1);
        expect(supportedBrowserQuestionRow
          .find('.nhsuk-summary-list__key').text().trim()).toEqual('Browsers Supported');
        expect(supportedBrowserQuestionRow
          .find('.nhsuk-summary-list__value')
          .find('[data-test-id="view-question-data-bulletlist"]').length).toEqual(1);

        done();
      });
  });

  it('should render the mobile responsive answer', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'browsers-supported': {
              answers: {
                'mobile-responsive': 'yes',
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

        const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
        const mobileResponsiveQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-mobile-responsive"]');

        expect(browserBasedSectionTable.length).toEqual(1);
        expect(mobileResponsiveQuestionRow.length).toEqual(1);
        expect(mobileResponsiveQuestionRow
          .find('.nhsuk-summary-list__key').text().trim()).toEqual('Mobile responsive');
        expect(mobileResponsiveQuestionRow
          .find('.nhsuk-summary-list__value')
          .find('[data-test-id="view-question-data-text-mobile-responsive"]').length).toEqual(1);

        done();
      });
  });

  it('should render the plugins required answer', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'plug-ins-or-extensions': {
              answers: {
                'plugins-required': 'yes',
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

        const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
        const pluginsRequiredQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-plugins-required"]');

        expect(browserBasedSectionTable.length).toEqual(1);
        expect(pluginsRequiredQuestionRow.length).toEqual(1);
        expect(pluginsRequiredQuestionRow
          .find('.nhsuk-summary-list__key').text().trim()).toEqual('Plug-ins or extensions required');
        expect(pluginsRequiredQuestionRow
          .find('.nhsuk-summary-list__value')
          .find('[data-test-id="view-question-data-text-plugins-required"]').length).toEqual(1);

        done();
      });
  });

  it('should render the plugins detail answer', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'plug-ins-or-extensions': {
              answers: {
                'plugins-detail': 'Some plugin detail',
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

        const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
        const pluginsDetailQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-plugins-detail"]');

        expect(browserBasedSectionTable.length).toEqual(1);
        expect(pluginsDetailQuestionRow.length).toEqual(1);
        expect(pluginsDetailQuestionRow
          .find('.nhsuk-summary-list__key').text().trim()).toEqual('Plug-ins or extensions information');
        expect(pluginsDetailQuestionRow
          .find('.nhsuk-summary-list__value')
          .find('[data-test-id="view-question-data-text-plugins-detail"]').length).toEqual(1);

        done();
      });
  });

  it('should only render the plugins required and plugins detail answers', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'plug-ins-or-extensions': {
              answers: {
                'plugins-required': 'yes',
                'plugins-detail': 'Some plugin detail',
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

        const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
        const supportedBrowserQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-supported-browsers"]');
        const mobileResponsiveQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-mobile-responsive"]');
        const pluginsRequiredQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-plugins-required"]');
        const pluginsDetailQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-plugins-detail"]');

        expect(browserBasedSectionTable.length).toEqual(1);
        expect(supportedBrowserQuestionRow.length).toEqual(0);
        expect(mobileResponsiveQuestionRow.length).toEqual(0);
        expect(pluginsRequiredQuestionRow.length).toEqual(1);
        expect(pluginsDetailQuestionRow.length).toEqual(1);

        done();
      });
  });
});
