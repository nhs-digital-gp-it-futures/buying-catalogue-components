import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'warningCallout',
    path: 'components/general/components/warning-callout/macro.njk',
  },
};

const mockContext = {
  params: {
    heading: 'Warning heading',
    HTML: 'Some HTML content',
  },
};

describe('warning callout', () => {
  it('should render the warning', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('[data-test-id="warning"]').length).toEqual(1);
    });
  }));

  it('should render the heading', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('h3').length).toEqual(1);
      expect($('h3').text().trim()).toContain(mockContext.params.heading);
    });
  }));

  it('should render the html body', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('div[data-test-id="warning-body"]').length).toEqual(1);
      expect($('div[data-test-id="warning-body"]').text().trim()).toEqual(mockContext.params.HTML);
    });
  }));
});
