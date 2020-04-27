import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'loginLogout',
    path: 'components/general/components/login-logout/macro.njk',
  },
};


describe('login-logout', () => {
  it('should render the login/logout component with the correct data-test-id', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-login-logout"]').length).toEqual(1);
    });
  }));

  it('should render the logged in text if username provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
        username: 'NHS Digital',
      },
    };

    harness.request(context, ($) => {
      const text = $('div[data-test-id="qa-identifier-login-logout"] span').text().trim().split(/\s\s+/);
      expect(text[0]).toEqual('Logged in as: NHS Digital');
      expect(text[1]).toEqual('Log out');
    });
  }));

  it('should render the logout link if username provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
        username: 'NHS Digital',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-login-logout"] a').text().trim()).toEqual('Log out');
    });
  }));

  it('should render the login link if username not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-login-logout"] a').text().trim()).toEqual('Log in');
    });
  }));

  it('should render the login link with the loginUrl provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
        loginUrl: '/some-login-url',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-login-logout"] a').attr('href')).toEqual('/some-login-url');
    });
  }));

  it('should render the logout link with the logoutUrl provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
        username: 'NHS Digital',
        logoutUrl: '/some-logout-url',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-login-logout"] a').attr('href')).toEqual('/some-logout-url');
    });
  }));

  it('should render the login/logout component with the correct classes', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
        classes: 'extra-class',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-login-logout"]').hasClass('bc-c-login-logout')).toEqual(true);
      expect($('div[data-test-id="qa-identifier-login-logout"]').hasClass('extra-class')).toEqual(true);
    });
  }));
});
