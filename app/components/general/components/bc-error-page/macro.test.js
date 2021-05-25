import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcErrorPage',
    path: 'components/general/components/bc-error-page/macro.njk',
  },
};

describe('bc-error-page', () => {
  it('should render the error backLink if in params', componentTester(setup, (harness) => {
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

  it('should not render the error backLink if not in params', componentTester(setup, (harness) => {
    const context = {
      params: { },
    };

    harness.request(context, ($) => {
      const backLink = $('[data-test-id="error-back-link"] a');
      expect(backLink.length).toEqual(0);
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

  it('should not render the stack trace heading when there is no stack trace', componentTester(setup, (harness) => {
    const context = { params: { error: {} } };

    harness.request(context, ($) => {
      const stackTraceHeading = $('[data-test-id="stackTrace-heading"]');
      expect(stackTraceHeading.length).toEqual(0);
    });
  }));

  it('should render the stack trace heading when a stack trace is present', componentTester(setup, (harness) => {
    const context = {
      params: {
        error: {
          stackTrace: 'This is a stack trace...',
        },
      },
    };

    harness.request(context, ($) => {
      const stackTraceHeading = $('[data-test-id="stackTrace-heading"]');
      expect(stackTraceHeading.length).toEqual(1);
      expect(stackTraceHeading.text().trim()).toEqual('Stack Trace');
    });
  }));

  it('should not render the stack trace when there is no stack trace', componentTester(setup, (harness) => {
    const context = { params: { error: {} } };

    harness.request(context, ($) => {
      const stackTrace = $('[data-test-id="error-stackTrace"]');
      expect(stackTrace.length).toEqual(0);
    });
  }));

  it('should render the stack trace when a stack trace is present', componentTester(setup, (harness) => {
    const stackTrace = 'This is a stack trace...';
    const context = {
      params: {
        error: {
          stackTrace,
        },
      },
    };

    harness.request(context, ($) => {
      const stackTraceContent = $('[data-test-id="error-stackTrace"]');
      expect(stackTraceContent.length).toEqual(1);
      expect(stackTraceContent.text().trim()).toEqual(stackTrace);
    });
  }));
});
