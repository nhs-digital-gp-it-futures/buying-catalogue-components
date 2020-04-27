import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewDataText',
    path: 'components/view/components/view-data-text/macro.njk',
  },
};


describe('view-data-text', () => {
  it('should render the data when provided', componentTester(setup, (harness) => {
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

  it('should not render the data when not provided', componentTester(setup, (harness) => {
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
