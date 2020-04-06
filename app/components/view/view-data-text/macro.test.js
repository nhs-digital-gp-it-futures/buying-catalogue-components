import { createTestHarness } from '../../../testUtils/testHarness';

const setup = {
  templateName: 'viewDataText',
  templateType: 'component',
  componentType: 'view',
};

describe('view-data-text', () => {
  it('should render the data when provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-test-identifier',
        data: 'Some question data',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-test-identifier"]').text().trim()).toEqual('Some question data');
    });
  }));

  it('should not render the data when not provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-test-identifier',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id^="some-test-identifier"]').length).toEqual(0);
    });
  }));
});
