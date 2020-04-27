import { componentTester } from '../../testUtils/componentTester';

const setup = {
  templateName: 'viewSolutionDescription',
  templateType: 'section',
};

describe('view-solution-description', () => {
  it('should render the title of the section', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {},
      },
    };

    harness.request(context, ($) => {
      expect($('h3').text().trim()).toEqual('Description');
    });
  }));

  it('should not render the solution-description section when not provided', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-description"]').length).toEqual(0);
    });
  }));

  describe('when there are answers provided for the questions', () => {
    it('should render the summary question title and data', componentTester(setup, (harness) => {
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
        const summaryQuestionRow = $('[data-test-id="view-section-table-row-summary"]');
        const summaryTitle = summaryQuestionRow.find('[data-test-id="view-section-table-row-title"]');
        const summaryInnerComponent = summaryQuestionRow.find('[data-test-id="view-section-table-row-component"]');
        const summaryAnswer = summaryInnerComponent.find('[data-test-id="view-question-data-text-summary"]');

        expect(summaryQuestionRow.length).toEqual(1);
        expect(summaryTitle.text().trim()).toEqual('Summary');

        expect(summaryInnerComponent.length).toEqual(1);
        expect(summaryAnswer.text().trim()).toEqual('Some summary data');
      });
    }));

    it('should render the description question title and data', componentTester(setup, (harness) => {
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
        const descriptionQuestionRow = $('[data-test-id="view-section-table-row-description"]');
        const descriptionTitle = descriptionQuestionRow.find('[data-test-id="view-section-table-row-title"]');
        const descriptionInnerComponent = descriptionQuestionRow.find('[data-test-id="view-section-table-row-component"]');
        const descriptionAnswer = descriptionInnerComponent.find('[data-test-id="view-question-data-text-description"]');

        expect(descriptionQuestionRow.length).toEqual(1);
        expect(descriptionTitle.text().trim()).toEqual('Full description');

        expect(descriptionInnerComponent.length).toEqual(1);
        expect(descriptionAnswer.text().trim()).toEqual('Some description data');
      });
    }));

    it('should only render the link question as a link component', componentTester(setup, (harness) => {
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
        const descriptionQuestionRow = $('[data-test-id="view-section-table-row-description"]');
        const descriptionTitle = descriptionQuestionRow.find('[data-test-id="view-section-table-row-title"]');
        const descriptionInnerComponent = descriptionQuestionRow.find('[data-test-id="view-section-table-row-component"]');
        const linkAnswer = descriptionInnerComponent.find('[data-test-id="view-question-data-link"]');

        expect(descriptionQuestionRow.length).toEqual(1);
        expect(descriptionTitle.text().trim()).toEqual('Full description');

        expect(descriptionInnerComponent.length).toEqual(1);
        expect(linkAnswer.text().trim()).toEqual('www.somelink.com');
      });
    }));
  });

  describe('when there are no answers provided for the questions', () => {
    it('should not render the summary question title and data', componentTester(setup, (harness) => {
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
        const summaryQuestionRow = $('[data-test-id="view-section-table-row-summary"]');
        expect(summaryQuestionRow.length).toEqual(0);
      });
    }));

    it('should not render the description question title and data', componentTester(setup, (harness) => {
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
        const descriptionQuestionRow = $('[data-test-id="view-section-table-row-description"]');
        expect(descriptionQuestionRow.length).toEqual(0);
      });
    }));

    it('should not render the solution link', componentTester(setup, (harness) => {
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
        const descriptionQuestionRow = $('[data-test-id="view-section-table-row-description"]');
        expect(descriptionQuestionRow.length).toEqual(0);
      });
    }));
  });
});
