import { createTestHarness } from '../../../../testUtils/testHarness';

const setup = {
  templateName: 'backToTop',
  templateType: 'component',
  componentType: 'general',
};

describe('back-to-top', () => {
  it('should render the back to top component with the correct data-test-id', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'back-to-top',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="back-to-top"]').length).toEqual(1);
    });
  }));

  it('should render the back to top component with the text provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'back-to-top',
        text: 'custom text',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="back-to-top"]').text().trim()).toEqual('custom text');
    });
  }));

  it('should render the back to top component with the default text if none provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'back-to-top',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="back-to-top"]').text().trim()).toEqual('Back to top');
    });
  }));

  it('should render the back to top component with the correct anchor link', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'back-to-top',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="back-to-top"] a').attr('href')).toEqual('#maincontent');
    });
  }));

  it('should render the back to top component svg', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'back-to-top',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="back-to-top"] a .nhsuk-icon__arrow-right').length).toEqual(1);
    });
  }));

  it('should render the back to top component with the correct classes', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'back-to-top',
        classes: 'extra-class',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="back-to-top"]').hasClass('bc-c-back-to-top')).toEqual(true);
      expect($('div[data-test-id="back-to-top"]').hasClass('extra-class')).toEqual(true);
    });
  }));
});
