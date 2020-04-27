import { componentTester } from '../../testUtils/componentTester';

import * as settingsContext from './settings.json';

const setup = {
  templateName: 'viewImplementationTimescales',
  templateType: 'section',
};

describe('view-implementation-timescales', () => {
  it('should render the title of the section', componentTester(setup, (harness) => {
    harness.request(settingsContext, ($) => {
      expect($('h3').text().trim()).toEqual('Implementation timescales');
    });
  }));

  it('should render the description answer when provided', componentTester(setup, (harness) => {
    harness.request(settingsContext, ($) => {
      expect($('[data-test-id="view-question-data-text-description"]').text().trim()).toEqual(settingsContext.params.section.answers.description);
    });
  }));

  it('should render the additional information of the section if the implementation timescales section is provided', componentTester(setup, (harness) => {
    harness.request(settingsContext, ($) => {
      const implementationTimescalesGuidance = $('[data-test-id="view-implementation-timescales-guidance"]');
      expect(implementationTimescalesGuidance.text().trim()).toEqual('These are the typical processes and timescales to implement this Catalogue Solution:');
    });
  }));

  it('should not render the description answer when not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          answers: {},
        },
      },
    };
    harness.request(context, ($) => {
      expect($('[data-test-id="view-question-data-text-description"]').length).toEqual(0);
    });
  }));
});
