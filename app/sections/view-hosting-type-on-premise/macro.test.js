import { componentTester } from '../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewHostingTypeOnPremise',
    path: 'sections/view-hosting-type-on-premise/macro.njk',
  },
};

describe('view-hosting-type-on-premise', () => {
  it('should render the summary answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            summary: 'Our solution uses a combination of private and public cloud suppliers. We store all of our patient confidential data in a data center that we own and manage. We leverage the power of [Public cloud provider] to run our analytical suite and only transfer anonymised or pseudonymised to that provider to support this.',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const summaryQuestionRow = $('[data-test-id="view-section-table-row-summary"]');
      const summaryInnerComponent = summaryQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-summary"]');

      expect(summaryQuestionRow.length).toEqual(1);
      expect(summaryQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Summary');
      expect(summaryInnerComponent.length).toEqual(1);
      expect(summaryInnerComponent.text().trim()).toEqual('Our solution uses a combination of private and public cloud suppliers. We store all of our patient confidential data in a data center that we own and manage. We leverage the power of [Public cloud provider] to run our analytical suite and only transfer anonymised or pseudonymised to that provider to support this.');
    });
  }));

  it('should render the link answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            link: 'www.healthcare-pro.co.uk/healthcare-system-1/hybrid-hosting',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const summaryQuestionRow = $('[data-test-id="view-section-table-row-summary"]');
      const linkInnerComponent = summaryQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-link"]');

      expect(linkInnerComponent.length).toEqual(1);
      expect(linkInnerComponent.text().trim()).toEqual('www.healthcare-pro.co.uk/healthcare-system-1/hybrid-hosting');
    });
  }));

  it('should not render the summary row if summary and link not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {},
        },
      },
    };

    harness.request(context, ($) => {
      const summaryQuestionRow = $('[data-test-id="view-section-table-row-summary"]');
      expect(summaryQuestionRow.length).toEqual(0);
    });
  }));

  it('should render the hosting model answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            'hosting-model': 'Our managed data center is hosted in two separate geographical locations, they both comply to the highest standards to ensure that even if one of our data centers suffers an outage, we can ensure that your daily activities are not interrupted. We also create a back up of all of our data every evening and store it separately, so in the result of any catastrophic failure, we can ensure that patient confidential information is kept secure.',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const hostingModelQuestionRow = $('[data-test-id="view-section-table-row-hosting-model"]');
      const hostingModelInnerComponent = hostingModelQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-hosting-model"]');

      expect(hostingModelQuestionRow.length).toEqual(1);
      expect(hostingModelQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Data center hosting model');
      expect(hostingModelInnerComponent.length).toEqual(1);
      expect(hostingModelInnerComponent.text().trim()).toEqual('Our managed data center is hosted in two separate geographical locations, they both comply to the highest standards to ensure that even if one of our data centers suffers an outage, we can ensure that your daily activities are not interrupted. We also create a back up of all of our data every evening and store it separately, so in the result of any catastrophic failure, we can ensure that patient confidential information is kept secure.');
    });
  }));

  it('should not render the hosting model answer if not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {},
        },
      },
    };

    harness.request(context, ($) => {
      const hostingModelQuestionRow = $('[data-test-id="view-section-table-row-hosting-model"]');
      expect(hostingModelQuestionRow.length).toEqual(0);
    });
  }));

  it('should render the requires HSCN answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            'requires-hscn': 'End user devices must be connected to HSCN/N3',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const requiresHSCNQuestionRow = $('[data-test-id="view-section-table-row-requires-hscn"]');
      const requiresHSCNInnerComponent = requiresHSCNQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-requires-hscn"]');

      expect(requiresHSCNInnerComponent.length).toEqual(1);
      expect(requiresHSCNInnerComponent.text().trim()).toEqual('End user devices must be connected to HSCN/N3');
    });
  }));

  it('should not render the requires HSCN answer if not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {
            'requires-hscn': '',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const requiresHSCNQuestionRow = $('[data-test-id="view-section-table-row-requires-hscn"]');
      const requiresHSCNInnerComponent = requiresHSCNQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-requires-hscn"]');
      expect(requiresHSCNInnerComponent.length).toEqual(0);
    });
  }));
});
