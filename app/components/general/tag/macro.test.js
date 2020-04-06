import { createTestHarness } from '../../../testUtils/testHarness';

const setup = {
  templateName: 'tag',
  templateType: 'component',
  componentType: 'general',
};

describe('tag', () => {
  it('should render the tag with the correct data-test-id', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-tag',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-tag"]').length).toEqual(1);
    });
  }));

  it('should render the tag with the correct text', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-tag',
        text: 'some tag text',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-tag"]').text().trim()).toEqual('some tag text');
    });
  }));

  it('should render the tag with the correct classes', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-tag',
        text: 'some tag text',
        classes: 'extra-class',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="qa-identifier-tag"]').hasClass('bc-c-tag')).toEqual(true);
      expect($('div[data-test-id="qa-identifier-tag"]').hasClass('extra-class')).toEqual(true);
    });
  }));
});
