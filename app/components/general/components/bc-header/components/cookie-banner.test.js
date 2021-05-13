import { componentTester } from '../../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'cookieBanner',
    path: 'components/general/components/bc-header/components/cookie-banner.njk',
  },
};

describe('cookie-banner', () => {
  it('should render the cookies-banner', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="cookie-banner"]').length).toEqual(1);
    });
  }));

  it('should render the cookies-banner href', componentTester(setup, (harness) => {
    const context = {
      params: {
        href: 'some-link',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="cookie-banner"] a').attr('href')).toEqual(context.params.href);
    });
  }));
});
