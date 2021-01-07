import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcErrorSummary',
    path: 'components/general/components/bc-error-summary/macro.njk',
  },
};

describe('bcErrorSummary', () => {
  it('should render the error summary title', componentTester(setup, (harness) => {
    const context = {
      params: {
        errors: [],
      },
    };

    harness.request(context, ($) => {
      expect($('.nhsuk-error-summary h2').text().trim()).toEqual('There is a problem');
    });
  }));

  it('should render the one error if the context only contains a single error', componentTester(setup, (harness) => {
    const context = {
      params: {
        errors: [
          {
            text: 'This is the first error',
            href: '#link-to-first-error',
          },
        ],
      },
    };

    harness.request(context, ($) => {
      expect($('ul li a').text().trim()).toEqual('This is the first error');
      expect($('ul li a').attr('href')).toEqual('#link-to-first-error');
    });
  }));

  it('should render multiple errors if the context contains multiple errors', componentTester(setup, (harness) => {
    const context = {
      params: {
        errors: [
          {
            text: 'This is the first error',
            href: '#link-to-first-error',
          },
          {
            text: 'This is the second error',
            href: '#link-to-second-error',
          },
          {
            text: 'This is the third error',
            href: '#link-to-third-error',
          },
        ],
      },
    };

    harness.request(context, ($) => {
      expect($('ul li').length).toEqual(3);
    });
  }));
});
