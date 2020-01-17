import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-hosting-type-private-cloud/macro.njk' import viewHostingTypePrivateCloud %}
                        {{ viewHostingTypePrivateCloud(params) }}`;

describe('view-hosting-type-private-cloud', () => {
  it('should render the summary answer', (done) => {
    const context = {
      params: {
        section: {
          answers: {
            summary: 'Our solution uses a combination of private and public cloud suppliers. We store all of our patient confidential data in a data center that we own and manage. We leverage the power of [Public cloud provider] to run our analytical suite and only transfer anonymised or pseudonymised to that provider to support this.',
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
        expect(summaryInnerComponent.text().trim()).toEqual('Our solution uses a combination of private and public cloud suppliers. We store all of our patient confidential data in a data center that we own and manage. We leverage the power of [Public cloud provider] to run our analytical suite and only transfer anonymised or pseudonymised to that provider to support this.');

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

  it('should not render the summary row if summary and link not provided', (done) => {
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

        const summaryQuestionRow = $('[data-test-id="view-section-table-row-summary"]');

        expect(summaryQuestionRow.length).toEqual(0);

        done();
      });
  });

  it('should render the hosting model answer', (done) => {
    const context = {
      params: {
        section: {
          answers: {
            'hosting-model': 'Our managed data center is hosted in two separate geographical locations, they both comply to the highest standards to ensure that even if one of our data centers suffers an outage, we can ensure that your daily activities are not interrupted. We also create a back up of all of our data every evening and store it separately, so in the result of any catastrophic failure, we can ensure that patient confidential information is kept secure.',
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const hostingModelQuestionRow = $('[data-test-id="view-section-table-row-hosting-model"]');
        const hostingModelInnerComponent = hostingModelQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-hosting-model"]');

        expect(hostingModelQuestionRow.length).toEqual(1);
        expect(hostingModelQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Data center hosting model');
        expect(hostingModelInnerComponent.length).toEqual(1);
        expect(hostingModelInnerComponent.text().trim()).toEqual('Our managed data center is hosted in two separate geographical locations, they both comply to the highest standards to ensure that even if one of our data centers suffers an outage, we can ensure that your daily activities are not interrupted. We also create a back up of all of our data every evening and store it separately, so in the result of any catastrophic failure, we can ensure that patient confidential information is kept secure.');

        done();
      });
  });

  it('should not render the hosting model answer if not provided', (done) => {
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

        const hostingModelQuestionRow = $('[data-test-id="view-section-table-row-hosting-model"]');

        expect(hostingModelQuestionRow.length).toEqual(0);

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

  it('should not render the requires HSCN answer if not provided', (done) => {
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
