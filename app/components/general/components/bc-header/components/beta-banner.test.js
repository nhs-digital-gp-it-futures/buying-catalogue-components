import { componentTester } from '../../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'betaBanner',
    path: 'components/general/components/bc-header/components/beta-banner.njk',
  },
};

describe('beta-banner', () => {
  it('should render the betaBanner tag', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('div[data-test-id="beta-tag"]').length).toEqual(1);
      expect($('div[data-test-id="beta-tag"]').text().trim()).toEqual('BETA');
      expect($('div[data-test-id="beta-tag"]').hasClass('bc-c-tag-beta')).toBeTruthy();
    });
  }));

  it('should render the betaBanner text', componentTester(setup, (harness) => {
    const context = {
      params: {
        termsHref: 'blob/store/host',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="beta-banner-text"]').text().trim()).toEqual('This is a new service - your feedback will help us improve it.');
      expect($('div[data-test-id="beta-banner-text"] a').text().trim()).toEqual('feedback');
      expect($('div[data-test-id="beta-banner-text"] a').attr('href')).toEqual(context.params.termsHref);
    });
  }));
});
