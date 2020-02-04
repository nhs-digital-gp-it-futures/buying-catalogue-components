import { createTestHarness } from '../../testUtils/testHarness';

import * as settingsContext from './settings';

const setup = {
  templateName: 'viewImplementationTimescales',
  templateType: 'section',
};

describe('view-implementation-timescales', () => {
  it('should render the title of the section', createTestHarness(setup, (harness) => {
    harness.request(settingsContext, ($) => {
      expect($('h3').text().trim()).toEqual('Implementation timescales');
    });
  }));

  it('should render the description answer when provided', createTestHarness(setup, (harness) => {
    harness.request(settingsContext, ($) => {
      expect($('[data-test-id="view-question-data-text-description"]').text().trim()).toEqual(settingsContext.params.section.answers.description);
    });
  }));

  it('should not render the description answer when not provided', createTestHarness(setup, (harness) => {
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
