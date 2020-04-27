import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  templateName: 'viewDataTitle',
  templateType: 'component',
  componentType: 'view',
};

describe('view-data-title', () => {
  it('should render the title', componentTester(setup, (harness) => {
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
