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
        username: 'John Smith',
      },
    };

    harness.request(context, ($) => {
      const loggedIn = $('span[data-test-id="logged-in"]');
      const loggedInText = loggedIn.find('[data-test-id="logged-in-text"]').text().trim();

      expect(loggedInText).toEqual('Logged in as: John Smith');
    });
  }));

  it('should render the logged in text with organisation if username and organisation provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
        username: 'John Smith',
        organisation: 'NHS Digital',
      },
    };

    harness.request(context, ($) => {
      const loggedIn = $('span[data-test-id="logged-in"]');
      const loggedInText = loggedIn.find('[data-test-id="logged-in-text"]').text().trim();

      expect(loggedInText).toEqual('Logged in as: John Smith for NHS Digital');
    });
  }));

  it('should render the logout link if username provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
        username: 'John Smith',
      },
    };

    harness.request(context, ($) => {
      const loggedIn = $('span[data-test-id="logged-in"]');
      const loggedOut = $('span[data-test-id="logged-out"]');
      const logoutLink = loggedIn.find('[data-test-id="logout-link"]');

      expect(loggedOut.length).toEqual(0);
      expect(logoutLink.text().trim()).toEqual('Log out');
    });
  }));

  it('should render the login link if username provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
      },
    };

    harness.request(context, ($) => {
      const loggedIn = $('span[data-test-id="logged-in"]');
      const loggedOut = $('span[data-test-id="logged-out"]');
      const loginLink = loggedOut.find('[data-test-id="login-link"]');

      expect(loggedIn.length).toEqual(0);
      expect(loginLink.text().trim()).toEqual('Log in');
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
      const loggedIn = $('span[data-test-id="logged-in"]');
      const loggedOut = $('span[data-test-id="logged-out"]');
      const loginLink = loggedOut.find('[data-test-id="login-link"]');

      expect(loggedIn.length).toEqual(0);
      expect(loginLink.attr('href')).toEqual('/some-login-url');
    });
  }));

  it('should render the logout link with the logoutUrl provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
        username: 'John Smith',
        logoutUrl: '/some-logout-url',
      },
    };

    harness.request(context, ($) => {
      const loggedIn = $('span[data-test-id="logged-in"]');
      const loggedOut = $('span[data-test-id="logged-out"]');
      const logoutLink = loggedIn.find('[data-test-id="logout-link"]');

      expect(loggedOut.length).toEqual(0);
      expect(logoutLink.attr('href')).toEqual('/some-logout-url');
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
