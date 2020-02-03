import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-supplier-asserted-integrations/macro.njk' import viewSupplierAssertedIntegrations %}
                        {{ viewSupplierAssertedIntegrations(params) }}`;

describe('view-supplier-asserted-integrations', () => {
  it('should render the supplier asserted integrations answer if provided', (done) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'http://www.some-link.com',
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const supplierAssertedIntegrationsQuestionRow = $('[data-test-id="view-section-table-row-supplier-asserted-integrations"]');

        expect(supplierAssertedIntegrationsQuestionRow.length).toEqual(1);
        expect(supplierAssertedIntegrationsQuestionRow.find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Supplier asserted integrations');

        done();
      });
  });

  it('should not render the supplier asserted integrations answer if not provided', (done) => {
    const context = {};

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const supplierAssertedIntegrationsQuestionRow = $('[data-test-id="view-section-table-row-supplier-asserted-integrations"]');

        expect(supplierAssertedIntegrationsQuestionRow.length).toEqual(0);

        done();
      });
  });

  it('should render the link answer if provided', (done) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'http://www.some-link.com',
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const summaryQuestionRow = $('[data-test-id="view-section-table-row-supplier-asserted-integrations"]');
        const linkInnerComponent = summaryQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-link"]');

        expect(linkInnerComponent.length).toEqual(1);
        expect(linkInnerComponent.text().trim()).toEqual('http://www.some-link.com');

        done();
      });
  });

  it('should render the additional information if supplier asserted integrations data provided', (done) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'http://www.some-link.com',
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const summaryQuestionRow = $('[data-test-id="view-section-table-row-supplier-asserted-integrations"]');
        const linkInnerComponent = summaryQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-data-text-additional-information"]');

        expect(linkInnerComponent.length).toEqual(1);
        expect(linkInnerComponent.text().trim()).toEqual('Supplier assured integrations are interoperability interfaces prepared by a supplier and are not specified or assured by the NHS.');

        done();
      });
  });
});
