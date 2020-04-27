import { componentTester } from '../../testUtils/componentTester';

const setup = {
  templateName: 'viewFeatures',
  templateType: 'section',
};

describe('view-features', () => {
  it('should render the title of the features section', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {},
      },
    };

    harness.request(context, ($) => {
      expect($('h3').text().trim()).toEqual('Features');
    });
  }));

  it('should not render the features section when not provided', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="view-features"]').length).toEqual(0);
    });
  }));

  describe('when there are answers provided for the questions', () => {
    it('should render the listings', componentTester(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              listing: [
                'Some first data',
                'Some second data',
                'Some third data',
              ],
            },
          },
        },
      };

      harness.request(context, ($) => {
        const featuresList = $('[data-test-id="view-question-data-bulletlist"] li');

        expect(featuresList.length).toEqual(3);
      });
    }));
  });

  describe('when there are no answers provided for the questions', () => {
    it('should not render the listings', componentTester(setup, (harness) => {
      const context = {
        params: {
          section: {
            answers: {
              listing: [],
            },
          },
        },
      };

      harness.request(context, ($) => {
        const featuresList = $('[data-test-id="view-question-data-bulletlist"] li');

        expect(featuresList.length).toEqual(0);
      });
    }));
  });
});
