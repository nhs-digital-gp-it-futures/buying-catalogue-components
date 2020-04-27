import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  templateName: 'viewDataBulletlist',
  templateType: 'component',
  componentType: 'view',
};

describe('view-data-bulletlist', () => {
  it('should render the data as a list when provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          'Some first data',
          'Some second data',
          'Some third data',
        ],
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"] ul').length).toEqual(1);
      expect($('[data-test-id="some-data-identifier"] li').length).toEqual(3);
    });
  }));

  it('should not render the data when not provided', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"]').length).toEqual(0);
    });
  }));

  it('should not render empty strings when provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          'Some first data',
          '',
          'Some second data',
          '',
          'Some third data',
          '',
        ],
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"] ul').length).toEqual(1);
      expect($('[data-test-id="some-data-identifier"] li').length).toEqual(3);
    });
  }));

  it('should not render strings that contain only spaces when provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          'Some first data',
          '   ',
          'Some second data',
          ' ',
          'Some third data',
          '       ',
        ],
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"] ul').length).toEqual(1);
      expect($('[data-test-id="some-data-identifier"] li').length).toEqual(3);
    });
  }));

  it('should add classes provided within the params', componentTester(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [],
        classes: 'new-class another-class',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-data-identifier"]').hasClass('bc-c-data-bulletlist')).toEqual(true);
      expect($('div[data-test-id="some-data-identifier"]').hasClass('new-class')).toEqual(true);
      expect($('div[data-test-id="some-data-identifier"]').hasClass('another-class')).toEqual(true);
    });
  }));
});
