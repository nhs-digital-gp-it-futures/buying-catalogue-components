import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'viewAboutSupplier',
  templateType: 'section',
};

describe('view-about-supplier', () => {
  it('should render the title of the section', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {},
      },
    };

    harness.request(context, ($) => {
      expect($('h3').text().trim()).toEqual('About supplier');
    });
  }));

  it('should not render the About supplier section when not provided', createTestHarness(setup, (harness) => {
    const context = {
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-about-supplier"]').length).toEqual(0);
    });
  }));

  describe('when there are answers provided for the questions', () => {
    it('should only render the description data', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              description: 'Some supplier description data',
            },
          },
        },
      };

      harness.request(context, ($) => {
        const descriptionQuestion = $('[data-test-id="view-section-question-description"]');
        expect(descriptionQuestion.find('[data-test-id="view-question-title"]').length).toEqual(0);
        expect(descriptionQuestion.find('[data-test-id="view-question-data-text-description"]').text().trim()).toEqual('Some supplier description data');
      });
    }));

    it('should only render the link', createTestHarness(setup, (harness) => {
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
    it('should not render the description data', createTestHarness(setup, (harness) => {
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
