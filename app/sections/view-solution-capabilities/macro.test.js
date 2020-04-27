import { componentTester } from '../../testUtils/componentTester';

const setup = {
  templateName: 'viewSolutionCapabilities',
  templateType: 'section',
};

describe('view-solution-capabilities', () => {
  it('should render the title of the section', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {},
      },
    };

    harness.request(context, ($) => {
      expect($('h3').text().trim()).toEqual('Capabilities met');
    });
  }));

  it('should not render the solution capabilities section when not provided', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-capabilities"]').length).toEqual(0);
    });
  }));

  it('should render the bullet list for each capability', componentTester(setup, (harness) => {
    const capabilitiesMet = ['capability 1', 'capability 2', 'capability 3'];
    const context = {
      params: {
        section: {
          answers: {
            'capabilities-met': capabilitiesMet,
          },
        },
      },
    };

    harness.request(context, ($) => {
      const capabilitiesMetList = $('[data-test-id="view-question-data-bulletlist"] li');
      expect(capabilitiesMetList.length).toEqual(3);
    });
  }));

  it('should render capabilities description if provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        description: 'description',
        section: {},
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-capabilities"] p').text().trim()).toEqual('description');
    });
  }));

  it('should not render capabilities description if not provided', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-capabilities"] p').length).toEqual(0);
    });
  }));
});
