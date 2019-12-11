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
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Browsers Supported');
        expect(supportedBrowserQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
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
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Mobile responsive');
        expect(mobileResponsiveQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
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
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Plug-ins or extensions required');
        expect(pluginsRequiredQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
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
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Plug-ins or extensions information');
        expect(pluginsDetailQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
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

  it('should render the hardware requirements description answer', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'browser-hardware-requirements': {
              answers: {
                'hardware-requirements-description': 'Some hardware requirement description',
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
        const hardwareRequirementsDescriptionQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-hardware-requirements-description"]');

        expect(browserBasedSectionTable.length).toEqual(1);
        expect(hardwareRequirementsDescriptionQuestionRow.length).toEqual(1);
        expect(hardwareRequirementsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Hardware requirements');
        expect(hardwareRequirementsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-hardware-requirements-description"]').length).toEqual(1);
        expect(hardwareRequirementsDescriptionQuestionRow
          .find('label').text().trim()).toEqual('Some hardware requirement description');

        done();
      });
  });
});
