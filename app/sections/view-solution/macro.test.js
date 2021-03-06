import { componentTester } from '../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewSolution',
    path: 'sections/view-solution/macro.njk',
  },
};

describe('viewSolution component', () => {
  it('should render the solutionHeader component', componentTester(setup, (harness) => {
    const context = {
      params: {
        solutionHeader: {
          id: '100000-001',
          name: 'Write on Time',
          supplierName: 'Really Kool Corporation',
          isFoundation: true,
          lastUpdated: '1996-03-15T10:00:00',
        },
        returnToDashboardUrl: '/supplier/solution/100000-001',
      },
    };

    harness.request(context, ($) => {
      expect($('h1').text().trim()).toEqual('Write on Time');
    });
  }));

  it('should render the solutions-description section when provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        sections: {
          'solution-description': {},
        },
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-description"]').length).toEqual(1);
    });
  }));

  it('should render the warning-callout section when provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        sections: {
          warningCallout: {},
        },
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="warning"]').length).toEqual(1);
    });
  }));

  it('should render the features section when provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        sections: {
          features: {},
        },
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-features"]').length).toEqual(1);
    });
  }));

  describe('integrations', () => {
    it('should render the integrations section if link is provided', componentTester(setup, (harness) => {
      const context = {
        params: {
          sections: {
            integrations: {
              answers: {
                link: 'link.com',
              },
            },
          },
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="view-integrations"]').length).toEqual(1);
        expect($('[data-test-id="view-question-data-text-link-supplier-integrations"]').length).toEqual(1);
      });
    }));

    it('should render the integrations section document-link is provided', componentTester(setup, (harness) => {
      const context = {
        params: {
          sections: {
            integrations: {
              answers: {
                'document-link': 'document.pdf',
              },
            },
          },
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="view-integrations"]').length).toEqual(1);
        expect($('[data-test-id="view-question-data-text-link-authority-integrations"]').length).toEqual(1);
      });
    }));
  });

  it('should render the client application types section when provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        sections: {
          'client-application-types': {},
        },
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-client-application-types"]').length).toEqual(1);
    });
  }));

  it('should render the hosting types section when one of the sections is provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        sections: {
          'hosting-type-private-cloud': {},
        },
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-hosting-types"]').length).toEqual(1);
    });
  }));

  it('should render the capabilities section when provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        sections: {
          capabilities: {
            answers: {
              'capabilities-met': [{
                name: 'Communicate With Practice - Citizen',
                version: '1.0.1',
                description: 'Supports secure and trusted electronic communications between Citizens and the Practice. Integrates with Patient Information Maintenance.',
                link: 'https://gpitbjss.atlassian.net/wiki/spaces/GPITF/pages/1391134188/Communicate+With+Practice+-+Citizen',
              }],
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-capabilities"]').length).toEqual(1);
    });
  }));

  it('should render the learn-more section when provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        sections: {
          'learn-more': {
            answers: {
              'document-link': '/solution/10001/document/solution.pdf',
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-learn-more"]').length).toEqual(1);
    });
  }));

  it('should render the back to top link', componentTester(setup, (harness) => {
    const context = {
      params: {
        sections: {},
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="back-to-top-link"]').length).toEqual(1);
    });
  }));
});
