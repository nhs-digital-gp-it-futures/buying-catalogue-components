import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-native-mobile/macro.njk' import viewNativeMobile %}
                        {{ viewNativeMobile(params) }}`;

describe('view-native-mobile', () => {
  it('should render the supported operating systems answer', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'mobile-operating-systems': {
              answers: {
                'operating-systems': ['Apple IOS'],
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

        const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
        const operatingSystemsQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-operating-systems"]');
        const supportedOperatingSystemsInnerComponent = operatingSystemsQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-bulletlist"]');

        expect(nativeMobileSectionTable.length).toEqual(1);
        expect(operatingSystemsQuestionRow.length).toEqual(1);
        expect(operatingSystemsQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Supported operating systems');
        expect(supportedOperatingSystemsInnerComponent.length).toEqual(1);
        expect(supportedOperatingSystemsInnerComponent.text().trim()).toEqual('Apple IOS');

        done();
      });
  });

  it('should render the additional operating system information answer', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'mobile-operating-systems': {
              answers: {
                'operating-systems-description': 'Android 4.1 and above, IOS 10.6 and above.',
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

        const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
        const operatingSystemsDescriptionQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-operating-systems-description"]');
        const operatingSystemsDescriptionInnerComponent = operatingSystemsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-operating-systems-description"]');

        expect(nativeMobileSectionTable.length).toEqual(1);
        expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);
        expect(operatingSystemsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Additional operating system information');
        expect(operatingSystemsDescriptionInnerComponent.length).toEqual(1);
        expect(operatingSystemsDescriptionInnerComponent.text().trim()).toEqual('Android 4.1 and above, IOS 10.6 and above.');

        done();
      });
  });

  it('should render the mobile first answer', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'mobile-first': {
              answers: {
                'mobile-first-design': 'Yes',
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

        const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
        const mobileFirstDesignQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-mobile-first-design"]');
        const mobileFirstDesignInnerComponent = mobileFirstDesignQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-mobile-first-design"]');

        expect(nativeMobileSectionTable.length).toEqual(1);
        expect(mobileFirstDesignQuestionRow.length).toEqual(1);
        expect(mobileFirstDesignQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Designed with a mobile first approach');
        expect(mobileFirstDesignInnerComponent.length).toEqual(1);
        expect(mobileFirstDesignInnerComponent.text().trim()).toEqual('Yes');

        done();
      });
  });
});
