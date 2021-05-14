import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcHeader',
    path: 'components/general/components/bc-header/macro.njk',
  },
};

describe('bc-header', () => {
  it('should render the betaBanner component if showBetaBanner is set', componentTester(setup, (harness) => {
    const context = {
      params: {
        showBetaBanner: true,
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="beta-banner"]').length).toEqual(1);
      expect($('[data-test-id="beta-tag"]').length).toEqual(1);
      expect($('[data-test-id="beta-banner-text"]').length).toEqual(1);
    });
  }));

  it('should not render the betaBanner component if showBetaBanner is not set', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="beta-banner"]').length).toEqual(0);
      expect($('[data-test-id="beta-tag"]').length).toEqual(0);
      expect($('[data-test-id="beta-banner-text"]').length).toEqual(0);
    });
  }));

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

  it('should add the correct href and aria-label to the logo link if provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-header',
        logoLink: {
          href: '/',
          ariaLabel: 'Buying Catalogue Homepage',
        },
      },
    };

    harness.request(context, ($) => {
      expect($('header[data-test-id="qa-identifier-header"] a').length).toEqual(1);
      expect($('header[data-test-id="qa-identifier-header"] a').attr('href')).toEqual('/');
      expect($('header[data-test-id="qa-identifier-header"] a').attr('aria-label')).toEqual('Buying Catalogue Homepage');
    });
  }));

  it('should render the cookieBanner component if cookieBanner is set', componentTester(setup, (harness) => {
    const context = {
      params: {
        cookiePrivacy: {
          showBanner: true,
        },
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="cookie-banner"]').length).toEqual(1);
    });
  }));

  it('should not render the cookieBanner component if cookieBanner is not set', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="cookie-banner"]').length).toEqual(0);
    });
  }));
});
