import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  templateName: 'viewDataLink',
  templateType: 'component',
  componentType: 'view',
};

describe('view-data-link', () => {
  it('should render the link when provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-test-identifier',
        data: 'www.somelink.com',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-test-identifier"] a').text().trim()).toEqual('www.somelink.com');
      expect($('[data-test-id="some-test-identifier"] a').attr('href')).toEqual('www.somelink.com');
    });
  }));

  it('should render the link with custom text when provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-test-identifier',
        data: 'www.somelink.com',
        text: 'custom text',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-test-identifier"] a').text().trim()).toEqual('custom text');
      expect($('[data-test-id="some-test-identifier"] a').attr('href')).toEqual('www.somelink.com');
    });
  }));

  it('should not render the data when not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-test-identifier',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-test-identifier"]').length).toEqual(0);
    });
  }));

  it('should add classes provided within the params', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: 'Some data',
        classes: 'new-class another-class',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-data-identifier"]').hasClass('bc-c-data-link')).toEqual(true);
      expect($('div[data-test-id="some-data-identifier"]').hasClass('new-class')).toEqual(true);
      expect($('div[data-test-id="some-data-identifier"]').hasClass('another-class')).toEqual(true);
    });
  }));
});
