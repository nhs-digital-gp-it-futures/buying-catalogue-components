import { createTestHarness } from '../../../../testUtils/testHarness';

const setup = {
  templateName: 'viewExpandableSection',
  templateType: 'component',
  componentType: 'view',
};

describe('view-expandable-section', () => {
  it('should render title of the expandable section', createTestHarness(setup, (harness) => {
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

  it('should render innerComponent of the expandable section', createTestHarness(setup, (harness) => {
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

  it('should add classes provided within the params', createTestHarness(setup, (harness) => {
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
