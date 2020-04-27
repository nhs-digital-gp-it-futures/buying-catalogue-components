import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewExpandableSection',
    path: 'components/view/components/view-expandable-section/macro.njk',
  },
};


describe('view-expandable-section', () => {
  it('should render title of the expandable section', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        title: 'Some section title',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"]').text().trim()).toEqual('Some section title');
    });
  }));

  it('should render innerComponent of the expandable section', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        title: 'Some section title',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"] p').text().trim()).toEqual('Some inner component');
    });
  }));

  it('should add classes provided within the params', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        title: 'Some title',
        classes: 'new-class another-class',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-data-identifier"]').hasClass('new-class')).toEqual(true);
      expect($('div[data-test-id="some-data-identifier"]').hasClass('another-class')).toEqual(true);
    });
  }));
});
