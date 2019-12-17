import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-native-mobile/macro.njk' import viewNativeMobile %}
                        {{ viewNativeMobile(params) }}`;

describe('view-native-mobile', () => {
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
        const nativeMobileQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-mobile-first-design"]');

        expect(nativeMobileSectionTable.length).toEqual(1);
        expect(nativeMobileQuestionRow.length).toEqual(1);
        expect(nativeMobileQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Designed with a mobile first approach');
        expect(nativeMobileQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]').length).toEqual(1);

        done();
      });
  });
});
