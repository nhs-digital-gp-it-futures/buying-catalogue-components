import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'viewHostingTypePublicCloud',
  templateType: 'section',
};

describe('view-hosting-type-public-cloud', () => {
  it('should render the summary answer', createTestHarness(setup, (harness) => {
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

  it('should render the link answer', createTestHarness(setup, (harness) => {
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

  it('should not render the summary row if summary and link not provided', createTestHarness(setup, (harness) => {
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

  it('should render the requires HSCN answer', createTestHarness(setup, (harness) => {
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

  it('should not render the requires HSCN answer if not provided', createTestHarness(setup, (harness) => {
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
