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

  it('should render with the altText provided as an aria-label', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-button-identifier',
        altText: 'some alternative text',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-button-identifier"]').attr('aria-label')).toEqual('some alternative text');
    });
  }));

  it('should render with the button text provided as an aria-label if altText is not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-button-identifier',
        text: 'some button text',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-button-identifier"]').attr('aria-label')).toEqual('some button text');
    });
  }));

  it('should render the name of the button with the text provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-button-identifier',
        enabled: true,
        text: 'name of button',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-button-identifier"]').text().trim()).toEqual('name of button');
    });
  }));

  it('should render with any classes provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-button-identifier',
        enabled: true,
        classes: 'some-class',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-button-identifier"] button').hasClass('some-class')).toEqual(true);
    });
  }));

  it('should render the href link if provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-button-identifier',
        href: '/some-href',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-button-identifier"] a').attr('href')).toEqual('/some-href');
    });
  }));

  it('should not render the button as disabled if "disabled" flag is not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-button-identifier',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-button-identifier"] button').hasClass('nhsuk-button--disabled')).toEqual(false);
    });
  }));

  it('should render the button as disabled if "disabled" flag is provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-button-identifier',
        disabled: 'true',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-button-identifier"] button').hasClass('nhsuk-button--disabled')).toEqual(true);
    });
  }));

  it('should render a span with a href if the link is disabled', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-button-identifier',
        href: '/some-href',
        disabled: 'true',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-button-identifier"] span').attr('href')).toEqual('/some-href');
    });
  }));

  it('should render a div if that element is supplied', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-button-identifier',
        element: 'div',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-button-identifier"] div').length).toEqual(1);
    });
  }));
});
