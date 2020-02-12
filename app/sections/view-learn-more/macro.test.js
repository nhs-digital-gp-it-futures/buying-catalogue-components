import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'viewLearnMore',
  templateType: 'section',
};

describe('view-learn-more', () => {
  describe('when there are answers provided for the questions', () => {
    const context = {
      params: {
        section: {
          answers: {
            'document-link': '/solution/10001/document/solution.pdf',
          },
        },
      },
    };

    it('should render the title of the section', createTestHarness(setup, (harness) => {
      harness.request(context, ($) => {
        expect($('h3').text().trim()).toEqual('Learn more');
      });
    }));

    it('should render the guidance text if the section is provided', createTestHarness(setup, (harness) => {
      harness.request(context, ($) => {
        const learnMoreGuidance = $('[data-test-id="view-learn-more-guidance"]');
        expect(learnMoreGuidance.text().trim()).toEqual('Find out more about this Catalogue Solution by downloading the full details.');
      });
    }));

    it('should render the button to download the solution pdf', createTestHarness(setup, (harness) => {
      harness.request(context, ($) => {
        const documentLinkQuestion = $('[data-test-id="view-section-question-document-link"]');
        expect(documentLinkQuestion.text().trim()).toEqual('Download this PDF');
        expect(documentLinkQuestion.find('a').attr('href')).toEqual('/solution/10001/document/solution.pdf');
      });
    }));
  });

  describe('when there are no answers provided for the questions', () => {
    it('should not render the learn more section when a section is not provided', createTestHarness(setup, (harness) => {
      const context = {};

      harness.request(context, ($) => {
        expect($('[data-test-id="view-learn-more"]').length).toEqual(0);
      });
    }));

    it('should not render the learn more section when an answer is not provided', createTestHarness(setup, (harness) => {
      const context = {
        section: {},
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="view-learn-more"]').length).toEqual(0);
      });
    }));

    it('should not render the learn more section when the answer provided is not document-link', createTestHarness(setup, (harness) => {
      const context = {
        section: {
          answers: {
            'some-id': 'some answer',
          },
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="view-learn-more"]').length).toEqual(0);
      });
    }));
  });
});
