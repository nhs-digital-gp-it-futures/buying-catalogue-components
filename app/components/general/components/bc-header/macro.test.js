import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcHeader',
    path: 'components/general/components/bc-header/macro.njk',
  },
};


describe('bc-header', () => {
  it('should render the header component with the correct data-test-id', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-header',
      },
    };

    harness.request(context, ($) => {
      expect($('header[data-test-id="qa-identifier-header"]').length).toEqual(1);
    });
  }));

  it('should render the nhs digital svg', componentTester(setup, (harness) => {
    const context = {
      params: {},
    };

    harness.request(context, ($) => {
      expect($('svg[data-test-id="nhs-digital-logo"]').length).toEqual(1);
    });
  }));

  it('should render the innerComponent if provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-header',
        innerComponent: '<p>Inner component</p>',
      },
    };

    harness.request(context, ($) => {
      expect($('header[data-test-id="qa-identifier-header"] .nhsuk-header__content p').text().trim()).toEqual('Inner component');
    });
  }));

  it('should not render the innerComponent if not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-header',
      },
    };

    harness.request(context, ($) => {
      expect($('header[data-test-id="qa-identifier-header"] .nhsuk-header__content').length).toEqual(0);
    });
  }));

  it('should render the header component with the correct classes', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-header',
        classes: 'extra-class',
      },
    };

    harness.request(context, ($) => {
      expect($('header[data-test-id="qa-identifier-header"]').hasClass('bc-c-header')).toEqual(true);
      expect($('header[data-test-id="qa-identifier-header"]').hasClass('extra-class')).toEqual(true);
    });
  }));
});
