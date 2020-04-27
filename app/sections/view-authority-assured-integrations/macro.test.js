import { componentTester } from '../../testUtils/componentTester';

const setup = {
  templateName: 'viewAuthorityAssuredIntegrations',
  templateType: 'section',
};

describe('view-authority-assured-integrations', () => {
  it('should render the authority assured integrations section if link answer is provided', componentTester(setup, (harness) => {
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
      const authorityAssuredIntegrationsQuestionRow = $('[data-test-id="view-section-table-row-authority-assured-integrations"]');
      const documentLink = authorityAssuredIntegrationsQuestionRow.find('div[data-test-id="view-question-data-text-link-authority-integrations"] > a');
      const gpconnectLink = authorityAssuredIntegrationsQuestionRow.find('div[data-test-id="view-question-data-text-link-gpconnect"] > a');
      const im1Link = authorityAssuredIntegrationsQuestionRow.find('div[data-test-id="view-question-data-text-link-im1"] > a');

      expect(authorityAssuredIntegrationsQuestionRow.length).toEqual(1);
      expect(authorityAssuredIntegrationsQuestionRow.find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('NHS assured integrations');
      expect(documentLink.text().trim()).toEqual('View NHS assured integrations');
      expect(documentLink.attr('href')).toEqual(context.params.section.answers['document-link']);
      expect(authorityAssuredIntegrationsQuestionRow.find('div[data-test-id="view-data-text-additional-information"]').text().trim()).toEqual('To find out more about these NHS assured integrations, follow the links below.');
      expect(gpconnectLink.text().trim()).toEqual('GPConnect');
      expect(gpconnectLink.attr('href')).toEqual('https://digital.nhs.uk/services/gp-connect');
      expect(im1Link.text().trim()).toEqual('IM1');
      expect(im1Link.attr('href')).toEqual('https://digital.nhs.uk/services/future-gp-it-systems-and-services/im1-pairing-integration');
    });
  }));

  it('should not render the authority assured integrations section if link answer is not provided', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      const authorityAssuredIntegrationsQuestionRow = $('[data-test-id="view-section-table-row-authority-assured-integrations"]');
      expect(authorityAssuredIntegrationsQuestionRow.length).toEqual(0);
    });
  }));
});
