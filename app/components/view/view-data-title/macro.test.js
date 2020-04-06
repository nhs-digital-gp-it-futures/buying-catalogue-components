import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'viewDataTitle',
  templateType: 'component',
};

describe('view-data-title', () => {
  it('should render the title', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-test-identifier',
        title: 'Some question title',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-test-identifier"]').text().trim()).toEqual('Some question title');
    });
  }));
});
