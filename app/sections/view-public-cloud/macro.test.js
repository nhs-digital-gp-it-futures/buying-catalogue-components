import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-public-cloud/macro.njk' import viewPublicCloud %}
                        {{ viewPublicCloud(params) }}`;

describe('view-public-cloud', () => {
  it('should render the summary answer', (done) => {
    const context = {
      params: {
        section: {
          answers: {
            summary: 'Our solution uses a combination of private and public cloud suppliers. We store all of our patient confidential data in a data centre that we own and manage. We leverage the power of [Public cloud provider] to run our analytical suite and only transfer anonymised or pseudonymised to that provider to support this.',
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const summaryQuestionRow = $('[data-test-id="view-section-table-row-summary"]');
        const summaryInnerComponent = summaryQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-summary"]');

        expect(summaryQuestionRow.length).toEqual(1);
        expect(summaryQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Summary');
        expect(summaryInnerComponent.length).toEqual(1);
        expect(summaryInnerComponent.text().trim()).toEqual('Our solution uses a combination of private and public cloud suppliers. We store all of our patient confidential data in a data centre that we own and manage. We leverage the power of [Public cloud provider] to run our analytical suite and only transfer anonymised or pseudonymised to that provider to support this.');

        done();
      });
  });

  it('should render the link answer', (done) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'www.healthcare-pro.co.uk/healthcare-system-1/hybrid-hosting',
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const summaryQuestionRow = $('[data-test-id="view-section-table-row-summary"]');
        const linkInnerComponent = summaryQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-link"]');

        expect(linkInnerComponent.length).toEqual(1);
        expect(linkInnerComponent.text().trim()).toEqual('www.healthcare-pro.co.uk/healthcare-system-1/hybrid-hosting');

        done();
      });
  });

  it('should render the requires HSCN answer', (done) => {
    const context = {
      params: {
        section: {
          answers: {
            'requires-hscn': 'This Solution requires a HSCN/N3 connection',
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const requiresHSCNQuestionRow = $('[data-test-id="view-section-table-row-requires-hscn"]');
        const requiresHSCNInnerComponent = requiresHSCNQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-requires-hscn"]');

        expect(requiresHSCNInnerComponent.length).toEqual(1);
        expect(requiresHSCNInnerComponent.text().trim()).toEqual('This Solution requires a HSCN/N3 connection');

        done();
      });
  });

  it('should not render the requires HSCN answer if not given', (done) => {
    const context = {
      params: {
        section: {
          answers: {
            'requires-hscn': '',
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const requiresHSCNQuestionRow = $('[data-test-id="view-section-table-row-requires-hscn"]');
        const requiresHSCNInnerComponent = requiresHSCNQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-requires-hscn"]');

        expect(requiresHSCNInnerComponent.length).toEqual(0);

        done();
      });
  });
});
