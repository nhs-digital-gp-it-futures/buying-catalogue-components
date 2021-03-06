import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewSectionTableRow',
    path: 'components/view/components/view-section-table-row/macro.njk',
  },
};

describe('view-section-table-row', () => {
  it('should render title of the row', componentTester(setup, (harness) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        questionTitle: 'Some question title',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    harness.request(context, ($) => {
      const sectionTableRow = $('div[data-test-id="view-section-table-row-some-question-id"]');
      expect(sectionTableRow.find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Some question title');
    });
  }));

  it('should not render title of the row when not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    harness.request(context, ($) => {
      const sectionTableRow = $('div[data-test-id="view-section-table-row-some-question-id"]');
      expect(sectionTableRow.find('h4[data-test-id="view-section-table-row-title"]').length).toEqual(0);
    });
  }));

  it('should render innerComponent of the value of the row as an inner component', componentTester(setup, (harness) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    harness.request(context, ($) => {
      const sectionTableRow = $('div[data-test-id="view-section-table-row-some-question-id"]');
      expect(sectionTableRow.find('div[data-test-id="view-section-table-row-component"] p').text().trim()).toEqual('Some inner component');
    });
  }));

  it('should not render the row if inner component is not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        questionId: 'some-question-id',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-section-table-row-some-question-id"]').length).toEqual(0);
    });
  }));

  it('should render a horizontal row if layout is not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-section-table-row-horizontal"]').length).toEqual(1);
    });
  }));

  it('should render a horizontal row if layout is set to "horizontal"', componentTester(setup, (harness) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        layout: 'horizontal',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-section-table-row-horizontal"]').length).toEqual(1);
    });
  }));

  it('should render a vertical row if layout is set to "vertical"', componentTester(setup, (harness) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        layout: 'vertical',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-section-table-row-vertical"]').length).toEqual(1);
    });
  }));

  it('should render a vertical row if layout is set to "VERTICAL"', componentTester(setup, (harness) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        layout: 'VERTICAL',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-section-table-row-vertical"]').length).toEqual(1);
    });
  }));

  it('should not render component if layout is set to "unknown"', componentTester(setup, (harness) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        layout: 'unknown',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id^="view-section-table-row"]').length).toEqual(0);
    });
  }));

  it('should add classes if classes are provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        innerComponent: '<p>Some inner component</p>',
        classes: 'a-new-class',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-section-table-row-some-question-id"]').hasClass('a-new-class')).toEqual(true);
    });
  }));
});
