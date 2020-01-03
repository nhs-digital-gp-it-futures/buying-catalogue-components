import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-native-desktop/macro.njk' import viewNativeDesktop %}
                        {{ viewNativeDesktop(params) }}`;

describe('view-native-desktop', () => {
  it('should render the operating system information answer', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-desktop-operating-systems': {
              answers: {
                'operating-systems-description': 'Windows 7 and above.',
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

        const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
        const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-operating-systems-description"]');
        const operatingSystemsDescriptionInnerComponent = operatingSystemsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-operating-systems-description"]');

        expect(nativeDesktopSectionTable.length).toEqual(1);
        expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);
        expect(operatingSystemsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Supported operating systems');
        expect(operatingSystemsDescriptionInnerComponent.length).toEqual(1);
        expect(operatingSystemsDescriptionInnerComponent.text().trim()).toEqual('Windows 7 and above.');

        done();
      });
  });

});
