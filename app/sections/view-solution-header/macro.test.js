import { createTestHarness } from '../../testUtils/testHarness';

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
  it('should not render the foundation tag if set to false', createTestHarness(setup, (harness) => {
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

  it('should render the foundation tag if set to true', createTestHarness(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-foundation"]').text().trim()).toEqual('Foundation Solution Set');
    });
  }));

  it('should render the solution name', createTestHarness(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-page-solution-name"]').text().trim()).toEqual('Write on Time');
    });
  }));

  it('should render the supplier name', createTestHarness(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-page-supplier-name"]').text().trim()).toEqual('Aperture Science');
    });
  }));

  it('should render the solution id', createTestHarness(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-page-solution-id"]').text().trim()).toEqual('Solution ID: 100000-001');
    });
  }));

  it('should render the last updated date', createTestHarness(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-page-last-updated"]').text().trim()).toEqual('Solution information last updated: 15 March 1996');
    });
  }));

  it('should not render the component if no data provided', createTestHarness(setup, (harness) => {
    harness.request({}, ($) => {
      expect($('[data-test-id="view-solution-header"]').length).toEqual(0);
    });
  }));
});
