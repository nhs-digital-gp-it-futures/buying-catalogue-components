import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcErrorPage',
    path: 'components/general/components/bc-error-page/macro.njk',
  },
};

describe('bc-error-page', () => {
  it('should render the error backLink', componentTester(setup, (harness) => {
    const context = {
      params: {
        backLink: {
          href: 'http://errorBackLinkHref.com',
          text: 'Error backLinkText',
        },
      },
    };

    harness.request(context, ($) => {
      const backLink = $('[data-test-id="error-back-link"] a');
      expect(backLink.length).toEqual(1);
      expect(backLink.text().trim()).toEqual(context.params.backLink.text);
      expect(backLink.attr('href')).toEqual(context.params.backLink.href);
    });
  }));

  it('should render the error title', componentTester(setup, (harness) => {
    const context = {
      params: {
        error: {
          title: 'Error Title',
        },
      },
    };

    harness.request(context, ($) => {
      const errorTitle = $('[data-test-id="error-title"]');
      expect(errorTitle.length).toEqual(1);
      expect(errorTitle.text().trim()).toEqual(context.params.error.title);
    });
  }));

  it('should render the error description', componentTester(setup, (harness) => {
    const context = {
      params: {
        error: {
          description: 'Error Description',
        },
      },
    };

    harness.request(context, ($) => {
      const errorDescription = $('[data-test-id="error-description"]');
      expect(errorDescription.length).toEqual(1);
      expect(errorDescription.text().trim()).toEqual(context.params.error.description);
    });
  }));
});
