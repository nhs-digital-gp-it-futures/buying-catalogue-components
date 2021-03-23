import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcErrorWrapper',
    path: 'components/general/components/bc-error-wrapper/macro.njk',
  },
};

describe('bc-error-wrapper', () => {
  it('should wrap the provided innerComponent as an error if an errorMessage is provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-component',
        errorMessages: ['some error message'],
        innerComponent: '<span data-test-id="inner-component">the inner component</span>',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-component"]').length).toEqual(1);
      expect($('[data-test-id="some-component-error"]').length).toEqual(1);
      expect($('[data-test-id="some-component-error"]').text().trim()).toEqual('some error message');
      expect($('[data-test-id="inner-component"]').length).toEqual(1);
    });
  }));

  it('should wrap the provided innerComponent as an error if an errorMessage.text is provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-component',
        errorMessages: [{ text: 'some error message' }],
        innerComponent: '<span data-test-id="inner-component">the inner component</span>',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-component"]').length).toEqual(1);
      expect($('[data-test-id="some-component-error"]').length).toEqual(1);
      expect($('[data-test-id="some-component-error"]').text().trim()).toEqual('some error message');
      expect($('[data-test-id="inner-component"]').length).toEqual(1);
    });
  }));

  it('should not wrap the provided innerComponent as an error when errorMessage is not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-component',
        innerComponent: '<span data-test-id="inner-component">the inner component</span>',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-component"]').length).toEqual(1);
      expect($('[data-test-id="some-component-error"]').length).toEqual(0);
      expect($('[data-test-id="inner-component"]').length).toEqual(1);
    });
  }));
});
