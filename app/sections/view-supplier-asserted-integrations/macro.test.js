import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'viewSupplierAssertedIntegrations',
  templateType: 'section',
};

describe('view-supplier-asserted-integrations', () => {
  it('should render the supplier asserted integrations answer if provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'http://www.some-link.com',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const supplierAssertedIntegrationsQuestionRow = $('[data-test-id="view-section-table-row-supplier-asserted-integrations"]');

      expect(supplierAssertedIntegrationsQuestionRow.length).toEqual(1);
      expect(supplierAssertedIntegrationsQuestionRow.find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Supplier asserted integrations');
    });
  }));

  it('should not render the supplier asserted integrations answer if not provided', createTestHarness(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const supplierAssertedIntegrationsQuestionRow = $('[data-test-id="view-section-table-row-supplier-asserted-integrations"]');
      expect(supplierAssertedIntegrationsQuestionRow.length).toEqual(0);
    });
  }));

  it('should render the link answer if provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'http://www.some-link.com',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const summaryQuestionRow = $('[data-test-id="view-section-table-row-supplier-asserted-integrations"]');
      const linkInnerComponent = summaryQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-link-supplier-integrations"]');

      expect(linkInnerComponent.length).toEqual(1);
      expect(linkInnerComponent.text().trim()).toEqual('http://www.some-link.com');
    });
  }));

  it('should render the additional information if supplier asserted integrations data provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'http://www.some-link.com',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const summaryQuestionRow = $('[data-test-id="view-section-table-row-supplier-asserted-integrations"]');
      const linkInnerComponent = summaryQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-data-text-additional-information"]');

      expect(linkInnerComponent.length).toEqual(1);
      expect(linkInnerComponent.text().trim()).toEqual('Supplier asserted integrations are interoperability interfaces prepared by a supplier and are not specified or assured by the NHS.');
    });
  }));
});
