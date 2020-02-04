import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'viewIntegrations',
  templateType: 'section',
};

describe('view-integrations', () => {
  it('should render the integrations section if section data provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            integrations: {},
          },
        },
      },
    };

    harness.request(context, ($) => {
      const integrations = $('[data-test-id="view-integrations"]');
      expect(integrations.length).toEqual(1);
    });
  }));

  it('should not render the integrations section if no section data provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {},
    };

    harness.request(context, ($) => {
      const integrations = $('[data-test-id="view-integrations"]');
      expect(integrations.length).toEqual(0);
    });
  }));

  it('should not render the integrations section if invalid section provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'invalid-section': {},
          },
        },
      },
    };

    harness.request(context, ($) => {
      const integrations = $('[data-test-id="view-integrations"]');
      expect(integrations.length).toEqual(0);
    });
  }));

  it('should render the title of the section if the integrations section is provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            integrations: {},
          },
        },
      },
    };

    harness.request(context, ($) => {
      expect($('h3').text().trim()).toEqual('Integrations');
    });
  }));

  it('should render the additional information of the section if the integrations section is provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            integrations: {},
          },
        },
      },
    };

    harness.request(context, ($) => {
      const integrationsSection = $('[data-test-id="view-integrations"]');
      const integrationsAdditionalInformation = integrationsSection.find('div[data-test-id="view-section-integrations-additional-information"]');

      expect(integrationsAdditionalInformation.text().trim()).toEqual('View information about the systems this Catalogue Solution integrates with to exchange data:');
    });
  }));
});
