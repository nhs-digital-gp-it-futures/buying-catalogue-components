import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcButton',
    path: 'components/general/components/bc-button/macro.njk',
  },
};

describe('bcButton', () => {
  it('should render with the data-test-id provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-button-identifier',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-button-identifier"]').length).toEqual(1);
    });
  }));
});
