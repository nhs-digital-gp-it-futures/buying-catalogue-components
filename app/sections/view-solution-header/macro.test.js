import { componentTester } from '../../testUtils/componentTester';

const setup = {
  templateName: 'viewSolutionHeader',
  templateType: 'section',
};

const context = {
  params: {
    id: '100000-001',
    name: 'Write on Time',
    supplierName: 'Aperture Science',
    isFoundation: true,
    lastUpdated: '1996-03-15T10:00:00',
  },
};

describe('view-solution-header', () => {
  it('should not render the foundation tag if provided and set to false', componentTester(setup, (harness) => {
    const newContext = {
      params: {
        ...context,
        isFoundation: false,
      },
    };

    harness.request(newContext, ($) => {
      expect($('[data-test-id="view-solution-foundation"]').length).toEqual(0);
    });
  }));

  it('should render the foundation tag if provided and set to true', componentTester(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-foundation"]').text().trim()).toEqual('Foundation Solution Set');
    });
  }));

  it('should not render the foundation tag if not provided', componentTester(setup, (harness) => {
    const newContext = { ...context };
    delete newContext.params.isFoundation;

    harness.request(newContext, ($) => {
      expect($('[data-test-id="view-solution-foundation"]').length).toEqual(0);
    });
  }));

  it('should render the solution name if provided', componentTester(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-page-solution-name"]').text().trim()).toEqual('Write on Time');
    });
  }));

  it('should not render the solution name if not provided', componentTester(setup, (harness) => {
    const newContext = { ...context };
    delete newContext.params.name;

    harness.request(newContext, ($) => {
      expect($('[data-test-id="view-solution-page-solution-name"]').length).toEqual(0);
    });
  }));

  it('should render the supplier name if provided', componentTester(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-page-supplier-name"]').text().trim()).toEqual('Aperture Science');
    });
  }));

  it('should not render the supplier name if not provided', componentTester(setup, (harness) => {
    const newContext = { ...context };
    delete newContext.params.supplierName;

    harness.request(newContext, ($) => {
      expect($('[data-test-id="view-solution-page-supplier-name"]').length).toEqual(0);
    });
  }));

  it('should render the solution id if provided', componentTester(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-page-solution-id"]').text().trim()).toEqual('Solution ID: 100000-001');
    });
  }));

  it('should not render the solution id if not provided', componentTester(setup, (harness) => {
    const newContext = { ...context };
    delete newContext.params.id;

    harness.request(newContext, ($) => {
      expect($('[data-test-id="view-solution-page-solution-id"]').length).toEqual(0);
    });
  }));

  it('should render the last updated date if provided', componentTester(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-page-last-updated"]').text().trim()).toEqual('Solution information last updated: 15 March 1996');
    });
  }));

  it('should not render the last updated date if not provided', componentTester(setup, (harness) => {
    const newContext = { ...context };
    delete newContext.params.lastUpdated;

    harness.request(newContext, ($) => {
      expect($('[data-test-id="view-solution-page-last-updated"]').length).toEqual(0);
    });
  }));

  it('should not render the component if no data provided', componentTester(setup, (harness) => {
    harness.request({}, ($) => {
      expect($('[data-test-id="view-solution-header"]').length).toEqual(0);
    });
  }));
});
