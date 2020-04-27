import { componentTester } from '../../testUtils/componentTester';

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

    it('should render the title of the section', componentTester(setup, (harness) => {
      harness.request(context, ($) => {
        expect($('h3').text().trim()).toEqual('Learn more');
      });
    }));

    it('should render the guidance text if the section is provided', componentTester(setup, (harness) => {
      harness.request(context, ($) => {
        const learnMoreGuidance = $('[data-test-id="view-learn-more-guidance"]');
        expect(learnMoreGuidance.text().trim()).toEqual('Learn more about this Catalogue Solution, for example its price, the standards it has met and any additional or associated services available.');
      });
    }));

    it('should render the button to download the solution pdf', componentTester(setup, (harness) => {
      harness.request(context, ($) => {
        const documentLinkQuestion = $('[data-test-id="view-section-question-document-link"]');
        expect(documentLinkQuestion.text().trim()).toEqual('Download PDF');
        expect(documentLinkQuestion.find('a').attr('href')).toEqual('/solution/10001/document/solution.pdf');
      });
    }));
  });

  describe('when there are no answers provided for the questions', () => {
    it('should not render the learn more section when a section is not provided', componentTester(setup, (harness) => {
      const context = {};

      harness.request(context, ($) => {
        expect($('[data-test-id="view-learn-more"]').length).toEqual(0);
      });
    }));

    it('should not render the learn more section when an answer is not provided', componentTester(setup, (harness) => {
      const context = {
        section: {},
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="view-learn-more"]').length).toEqual(0);
      });
    }));

    it('should not render the learn more section when the answer provided is not document-link', componentTester(setup, (harness) => {
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
