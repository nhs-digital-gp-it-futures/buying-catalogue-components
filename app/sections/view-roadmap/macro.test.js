import { componentTester } from '../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewRoadmap',
    path: 'sections/view-roadmap/macro.njk',
  },
};

describe('view-roadmap', () => {
  it('should render the title of the section', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {},
      },
    };

    harness.request(context, ($) => {
      expect($('h3').text().trim()).toEqual('Roadmap');
    });
  }));

  it('should not render the roadmap section when not provided', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="view-roadmap"]').length).toEqual(0);
    });
  }));

  it('should render the guidance text if the section is provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {},
      },
    };

    harness.request(context, ($) => {
      const roadmapGuidance = $('[data-test-id="view-roadmap-guidance"]');
      expect(roadmapGuidance.text().trim()).toEqual('These are the supplier’s development plans for this Catalogue Solution:');
    });
  }));

  describe('when there are answers provided for the questions', () => {
    it('should render the summary data', componentTester(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              summary: 'Some roadmap summary data',
            },
          },
        },
      };

      harness.request(context, ($) => {
        const summaryQuestion = $('[data-test-id="view-section-question-summary"]');
        expect(summaryQuestion.find('[data-test-id="view-question-title"]').length).toEqual(0);
        expect(summaryQuestion.find('[data-test-id="view-question-data-text-summary"]').text().trim()).toEqual('Some roadmap summary data');
      });
    }));

    it('should render the document link', componentTester(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              'document-link': '/solution/10001/document/roadmap.pdf',
            },
          },
        },
      };

      harness.request(context, ($) => {
        const documentLinkQuestion = $('[data-test-id="view-section-question-document-link"]');
        expect(documentLinkQuestion.find('[data-test-id="view-question-data-link-document-link"]').text().trim()).toEqual('View roadmap');
        expect(documentLinkQuestion.find('[data-test-id="view-question-data-link-document-link"] a').attr('href')).toEqual('/solution/10001/document/roadmap.pdf');
      });
    }));
  });

  describe('when there are no answers provided for the questions', () => {
    it('should not render the summary data', componentTester(setup, (harness) => {
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

    it('should not render the document link', componentTester(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              'document-link': '',
            },
          },
        },
      };

      harness.request(context, ($) => {
        const documentLinkQuestion = $('[data-test-id="view-section-question-document-link"]');
        expect(documentLinkQuestion.length).toEqual(0);
      });
    }));
  });
});
