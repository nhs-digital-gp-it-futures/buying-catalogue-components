import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'viewAuthorityAssertedIntegrations',
  templateType: 'section',
};

describe('view-authority-asserted-integrations', () => {
  it('should render the authority asserted integrations section if link answer is provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            'document-link': 'doclink',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const authorityAssertedIntegrationsQuestionRow = $('[data-test-id="view-section-table-row-authority-asserted-integrations"]');
      const documentLink = authorityAssertedIntegrationsQuestionRow.find('div[data-test-id="view-question-data-text-link-authority-integrations"] > a');
      const gpconnectLink = authorityAssertedIntegrationsQuestionRow.find('div[data-test-id="view-question-data-text-link-gpconnect"] > a');
      const im1Link = authorityAssertedIntegrationsQuestionRow.find('div[data-test-id="view-question-data-text-link-im1"] > a');

      expect(authorityAssertedIntegrationsQuestionRow.length).toEqual(1);
      expect(authorityAssertedIntegrationsQuestionRow.find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('NHS asserted integrations');
      expect(documentLink.text().trim()).toEqual('View NHS assured integrations');
      expect(documentLink.attr('href')).toEqual(context.params.section.answers['document-link']);
      expect(authorityAssertedIntegrationsQuestionRow.find('div[data-test-id="view-data-text-additional-information"]').text().trim()).toEqual('To find out more about these NHS assured integrations, follow the links below.');
      expect(gpconnectLink.text().trim()).toEqual('GPConnect');
      expect(gpconnectLink.attr('href')).toEqual('https://digital.nhs.uk/services/gp-connect');
      expect(im1Link.text().trim()).toEqual('IM1');
      expect(im1Link.attr('href')).toEqual('https://digital.nhs.uk/services/future-gp-it-systems-and-services/im1-pairing-integration');
    });
  }));

  it('should not render the authority asserted integrations section if link answer is not provided', createTestHarness(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const authorityAssertedIntegrationsQuestionRow = $('[data-test-id="view-section-table-row-authority-asserted-integrations"]');
      expect(authorityAssertedIntegrationsQuestionRow.length).toEqual(0);
    });
  }));
});
