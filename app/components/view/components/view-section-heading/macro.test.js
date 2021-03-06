import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewSectionHeading',
    path: 'components/view/components/view-section-heading/macro.njk',
  },
};

describe('view-section-heading', () => {
  it('should render view-section-heading component', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('div').hasClass('bc-c-section-heading')).toEqual(true);
    });
  }));

  it('should render the view-section-heading with the correct text', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        text: 'Some section heading text',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"]').text().trim()).toEqual('Some section heading text');
    });
  }));

  it('should add classes provided within the params', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        text: 'Some section heading text',
        classes: 'new-class another-class',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-data-identifier"]').hasClass('new-class')).toEqual(true);
      expect($('div[data-test-id="some-data-identifier"]').hasClass('another-class')).toEqual(true);
    });
  }));
});
