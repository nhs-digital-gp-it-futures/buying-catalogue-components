import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'loginLogout',
  templateType: 'component',
};

describe('login-logout', () => {
  it('should render the login/logout component with the correct data-test-id', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-login-logout"]').length).toEqual(1);
    });
  }));

  it('should render the logged in text if username provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
        username: 'NHS Digital',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-login-logout"] span').text().trim()).toEqual('Logged in as: NHS Digital');
    });
  }));

  it('should render the logout link if username provided', createTestHarness(setup, (harness) => {
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

  it('should render the login link if username not provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-login-logout',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-login-logout"] a').text().trim()).toEqual('Log in');
    });
  }));

  it('should render the login link with the loginUrl provided', createTestHarness(setup, (harness) => {
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

  it('should render the logout link with the logoutUrl provided', createTestHarness(setup, (harness) => {
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

  it('should render the login/logout component with the correct classes', createTestHarness(setup, (harness) => {
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
