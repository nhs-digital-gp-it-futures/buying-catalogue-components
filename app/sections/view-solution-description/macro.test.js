import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'viewSolutionDescription',
  templateType: 'section',
};

describe('view-solution-description', () => {
  it('should render the title of the section', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {},
      },
    };

    harness.request(context, ($) => {
      expect($('h3').text().trim()).toEqual('Solution description');
    });
  }));

  it('should not render the solution-description section when not provided', createTestHarness(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-description"]').length).toEqual(0);
    });
  }));

  describe('when there are answers provided for the questions', () => {
    it('should render the summary question title and data', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              summary: 'Some summary data',
            },
          },
        },
      };

      harness.request(context, ($) => {
        const summaryQuestion = $('[data-test-id="view-section-question-summary"]');

        expect(summaryQuestion.find('[data-test-id="view-question-title"]').text().trim()).toEqual('Summary');
        expect(summaryQuestion.find('[data-test-id="view-question-data-text-summary"]').text().trim()).toEqual('Some summary data');
      });
    }));

    it('should render the description question title and data', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              description: 'Some description data',
            },
          },
        },
      };

      harness.request(context, ($) => {
        const descriptionQuestion = $('[data-test-id="view-section-question-description"]');

        expect(descriptionQuestion.find('[data-test-id="view-question-title"]').text().trim()).toEqual('About the solution');
        expect(descriptionQuestion.find('[data-test-id="view-question-data-text-description"]').text().trim()).toEqual('Some description data');
      });
    }));

    it('should only render the link question as a link component', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              link: 'www.somelink.com',
            },
          },
        },
      };

      harness.request(context, ($) => {
        const linkQuestion = $('[data-test-id="view-section-question-link"]');

        expect(linkQuestion.find('[data-test-id="view-question-title"]').length).toEqual(0);
        expect(linkQuestion.find('[data-test-id="view-question-data-link"]').text().trim()).toEqual('www.somelink.com');
      });
    }));
  });

  describe('when there are no answers provided for the questions', () => {
    it('should not render the summary question title and data', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              summary: '',
            },
          },
        },
      };

      harness.request(context, ($) => {
        const summaryQuestion = $('[data-test-id="view-section-question-summary"]');

        expect(summaryQuestion.length).toEqual(0);
      });
    }));

    it('should not render the description question title and data', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              description: '',
            },
          },
        },
      };

      harness.request(context, ($) => {
        const descriptionQuestion = $('[data-test-id="view-section-question-description"]');
        expect(descriptionQuestion.length).toEqual(0);
      });
    }));

    it('should not render the solution link', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              link: '',
            },
          },
        },
      };

      harness.request(context, ($) => {
        const linkQuestion = $('[data-test-id="view-section-question-link"]');
        expect(linkQuestion.length).toEqual(0);
      });
    }));
  });
});
