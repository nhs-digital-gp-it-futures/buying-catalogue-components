import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcTable',
    path: 'components/general/components/bc-table/macro.njk',
  },
};

const mockContext = {
  params: {
    title: 'A title',
    description: 'A description',
    columnInfo: [
      { data: 'column 1 heading' },
      { data: 'column 2 heding' },
    ],
    columnClass: 'nhsuk-grid-column-one-half',
    data: [
      [{ data: 'data point 1a' }, { data: 'data point 1b' }],
      [{ data: 'data point 2a' }, { data: 'data point 2b' }]],
  },
};

describe('table', () => {
  it('should render the table', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('[data-test-id="table"]').length).toEqual(1);
    });
  }));

  it('should render the table headings with correct classes if columnInfo is passed in', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('[data-test-id="table-headings"]').length).toEqual(1);
      mockContext.params.columnInfo.forEach((heading, i) => {
        expect($(`[data-test-id="column-heading-${i}"]`).text().trim()).toEqual(heading.data);
        expect($(`[data-test-id="column-heading-${i}"]`).hasClass(mockContext.params.columnClass)).toEqual(true);
      });
    });
  }));

  it('should not render the table headings if no data is passed in', componentTester(setup, (harness) => {
    const context = { params: { ...mockContext.params } };
    delete context.params.columnInfo;

    harness.request(context, ($) => {
      expect($('[data-test-id="table-headings"]').length).toEqual(0);
      expect($('[data-test-id="column-heading"]').length).toEqual(0);
    });
  }));

  it('should render the table rows with text and classes if data is passed in', componentTester(setup, (harness) => {
    const context = { params: { ...mockContext.params } };
    harness.request(context, ($) => {
      context.params.data.forEach((row, rowIndex) => {
        row.forEach((dataPoint, i) => {
          expect($(`[data-test-id="table-row-${rowIndex}"] div:nth-child(${i + 1})`).text().trim()).toEqual(dataPoint.data);
          expect($(`[data-test-id="table-row-${rowIndex}"] div:nth-child(${i + 1})`).hasClass(mockContext.params.columnClass)).toEqual(true);
        });
      });
    });
  }));

  it('should not render the table rows if no data is passed in', componentTester(setup, (harness) => {
    const context = { params: { ...mockContext.params } };
    delete context.params.data;

    harness.request(context, ($) => {
      expect($('[data-test-id="table-rows"]').length).toEqual(0);
    });
  }));

  it('should render <div> for data with no href property', componentTester(setup, (harness) => {
    const context = {
      params: {
        ...mockContext.params,
        data: [
          [{ data: 'Greater Manchester CCG' }, { data: 'X01' }],
          [{ data: 'Hampshire CCG' }, { data: 'X02' }],
        ],
      },
    };

    harness.request(context, ($) => {
      context.params.data.forEach((row, rowIndex) => {
        row.forEach((dataPoint, i) => {
          const divTag = $(`[data-test-id="table-row-${rowIndex}"] div:nth-child(${i + 1})`);
          expect(divTag.text().trim()).toEqual(dataPoint.data);
          expect(divTag.hasClass(mockContext.params.columnClass)).toEqual(true);
          expect($(`[data-test-id="table-row-${rowIndex}"] a`).length).toEqual(0);
        });
      });
    });
  }));

  it('should render <a> for data with href property', componentTester(setup, (harness) => {
    const context = {
      params: {
        ...mockContext.params,
        data: [
          [
            { data: 'data point 1a', href: 'data/1a' },
            { data: 'data point 1b', href: 'data/1b' },
          ],
          [
            { data: 'data point 2a', href: 'data/2a' },
            { data: 'data point 2b', href: 'data/2b' },
          ],
        ],
      },
    };

    harness.request(context, ($) => {
      context.params.data.forEach((row, rowIndex) => {
        row.forEach((dataPoint, i) => {
          const aTag = $(`[data-test-id="table-row-${rowIndex}"] a:nth-child(${i + 1})`);
          expect(aTag.text().trim()).toEqual(dataPoint.data);
          expect(aTag.hasClass(mockContext.params.columnClass)).toEqual(true);
          expect(aTag.attr('href')).toEqual(dataPoint.href);
          expect($(`[data-test-id="table-row-${rowIndex}"] div`).length).toEqual(0);
        });
      });
    });
  }));

  it('should render tag component for columns with tag property', componentTester(setup, (harness) => {
    const context = {
      params: {
        ...mockContext.params,
        data: [
          [
            {
              tag: {
                dataTestId: 'a-tag-id-1',
                text: 'tag text',
                classes: 'a-class',
              },
            },
          ],
        ],
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="a-tag-id-1"]').text().trim()).toEqual(context.params.data[0][0].tag.text);
      expect($('[data-test-id="a-tag-id-1"]').hasClass(context.params.data[0][0].tag.classes)).toEqual(true);
    });
  }));
});
