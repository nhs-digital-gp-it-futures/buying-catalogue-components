import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcTableFlexible',
    path: 'components/general/components/bc-table-flexible/macro.njk',
  },
};

describe('table', () => {
  it('should render the table', componentTester(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="table"]').length).toEqual(1);
    });
  }));

  describe('column headings', () => {
    it('should render a single column heading if only one column is provided', componentTester(setup, (harness) => {
      const context = {
        params: {
          columnInfo: [{}],
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="table-headings"]').length).toEqual(1);
        expect($('th').length).toEqual(1);
      });
    }));

    it('should render the heading of the column', componentTester(setup, (harness) => {
      const context = {
        params: {
          columnInfo: [{
            data: 'column 1 header',
          }],
        },
      };

      harness.request(context, ($) => {
        const column1Heading = $('[data-test-id="column-heading-0-data"]');

        expect(column1Heading.text().trim()).toEqual('column 1 header');
      });
    }));

    it('should render the expandable section of the column', componentTester(setup, (harness) => {
      const context = {
        params: {
          columnInfo: [{
            data: 'column 1 header',
            expandableSection: {
              dataTestId: 'view-section-some-section-id',
              title: 'ExpandableSection title 1',
              innerComponent: 'Some inner text',
            },
          }],
        },
      };

      harness.request(context, ($) => {
        const column1ExpandableHeading = $('[data-test-id="column-heading-0-expandable"]');

        expect(column1ExpandableHeading.length).toEqual(1);
        expect(column1ExpandableHeading.find('span').text().trim()).toEqual('ExpandableSection title 1');
        expect(column1ExpandableHeading.find('.nhsuk-details__text').text().trim()).toEqual('Some inner text');
      });
    }));

    it('should render any additional classes to the column heading', componentTester(setup, (harness) => {
      const context = {
        params: {
          columnInfo: [{
            classes: 'some-extra-class',
          }],
        },
      };

      harness.request(context, ($) => {
        const column1Heading = $('[data-test-id="column-heading-0"]');

        expect(column1Heading.attr('class')).toContain('some-extra-class');
      });
    }));

    it('should render the column to the width provided', componentTester(setup, (harness) => {
      const context = {
        params: {
          columnInfo: [{
            width: '30%',
          }],
        },
      };

      harness.request(context, ($) => {
        const column1Heading = $('[data-test-id="column-heading-0"]');

        expect(column1Heading.attr('style')).toContain('width:30%');
      });
    }));

    it('should render a multiple column heading if multiple columns are provided', componentTester(setup, (harness) => {
      const context = {
        params: {
          columnInfo: [{}, {}, {}, {}, {}],
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="table-headings"]').length).toEqual(1);
        expect($('th').length).toEqual(5);
      });
    }));
  });
});
