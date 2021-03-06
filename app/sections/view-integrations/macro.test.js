import { componentTester } from '../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewIntegrations',
    path: 'sections/view-integrations/macro.njk',
  },
};

describe('view-integrations', () => {
  it('should render the integrations section if integrations answer link is provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'some-link',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const integrations = $('[data-test-id="view-integrations"]');
      expect(integrations.length).toEqual(1);
    });
  }));

  it('should render the integrations section if integrations answer document-link is provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            'document-link': 'some-link',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const integrations = $('[data-test-id="view-integrations"]');
      expect(integrations.length).toEqual(1);
    });
  }));

  it('should not render the integrations section if no section data provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {},
      },
    };

    harness.request(context, ($) => {
      const integrations = $('[data-test-id="view-integrations"]');
      expect(integrations.length).toEqual(0);
    });
  }));

  it('should not render the integrations section if invalid section provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          'invalid-section': {},
        },
      },
    };

    harness.request(context, ($) => {
      const integrations = $('[data-test-id="view-integrations"]');
      expect(integrations.length).toEqual(0);
    });
  }));

  it('should render the title of the section if the integrations section is provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'some-link',
          },
        },
      },
    };

    harness.request(context, ($) => {
      expect($('h3').text().trim()).toEqual('Integrations');
    });
  }));

  it('should render the additional information of the section if the integrations section is provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'some-link',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const integrationsGuidance = $('[data-test-id="view-integrations-guidance"]');

      expect(integrationsGuidance.text().trim()).toEqual('View information about the systems this Catalogue Solution integrates with to exchange data:');
    });
  }));

  it('should render the viewSupplierAssertedIntegrations component if link answer is provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'some-link',
          },
        },
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-supplier-asserted-integrations"]').length).toEqual(1);
      expect($('[data-test-id="view-supplier-asserted-integrations"] a').text().trim()).toEqual('some-link');
    });
  }));

  it('should render the viewAuthorityAssuredIntegrations component if document-link answer is provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            'document-link': 'some-document-link',
          },
        },
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-authority-assured-integrations"]').length).toEqual(1);
      expect($('[data-test-id="view-question-data-text-link-authority-integrations"] a').text().trim()).toEqual('View NHS assured integrations');
    });
  }));
});
