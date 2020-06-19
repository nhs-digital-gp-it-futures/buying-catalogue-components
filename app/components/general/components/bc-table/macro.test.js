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

const mockContextWithColumnClassArray = {
  params: {
    ...mockContext.params,
    columnClass: ['nhsuk-grid-column-one-half', 'nhsuk-grid-column-one-quarter'],
  },
};

describe('table', () => {
  it('should render the table', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('[data-test-id="table"]').length).toEqual(1);
    });
  }));

  it('should render the table headings with correct classes if columnInfo is passed in as string', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('[data-test-id="table-headings"]').length).toEqual(1);
      mockContext.params.columnInfo.forEach((heading, i) => {
        expect($(`[data-test-id="column-heading-${i}"]`).hasClass(mockContext.params.columnClass)).toEqual(true);
        expect($(`[data-test-id="column-heading-${i}-data"]`).text().trim()).toEqual(heading.data);
      });
    });
  }));

  it('should render the table headings with correct classes if columnInfo is passed in as string', componentTester(setup, (harness) => {
    harness.request(mockContextWithColumnClassArray, ($) => {
      expect($('[data-test-id="table-headings"]').length).toEqual(1);
      mockContext.params.columnInfo.forEach((heading, i) => {
        expect($(`[data-test-id="column-heading-${i}-data"]`).text().trim()).toEqual(heading.data);
        expect($(`[data-test-id="column-heading-${i}"]`).hasClass(mockContextWithColumnClassArray.params.columnClass[i])).toEqual(true);
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

  it('should render expandableSection component when table heading has property expandableSection', componentTester(setup, (harness) => {
    const context = {
      params: {
        columnInfo: [
          { data: 'column 1 heading' },
          {
            data: 'Column 2 heading',
            expandableSection: {
              dataTestId: 'some-expandableSection-heading-id',
              title: 'ExpandableSection heading title',
              innerComponent: 'Some inner component',
            },
          },
        ],
      },
    };

    harness.request(context, ($) => {
      const expandableSection = $('[data-test-id="some-expandableSection-heading-id"]');
      expect(expandableSection.find('span').text().trim()).toEqual('ExpandableSection heading title');
      expect(expandableSection.find('.nhsuk-details__text').text().trim()).toEqual('Some inner component');
    });
  }));

  it('should render the table rows with text and classes (string) if data is passed in', componentTester(setup, (harness) => {
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

  it('should render the table rows with text and classes (array) if data is passed in', componentTester(setup, (harness) => {
    harness.request(mockContextWithColumnClassArray, ($) => {
      mockContextWithColumnClassArray.params.data.forEach((row, rowIndex) => {
        row.forEach((dataPoint, i) => {
          expect($(`[data-test-id="table-row-${rowIndex}"] div:nth-child(${i + 1})`).text().trim()).toEqual(dataPoint.data);
          expect($(`[data-test-id="table-row-${rowIndex}"] div:nth-child(${i + 1})`).hasClass(mockContextWithColumnClassArray.params.columnClass[rowIndex])).toEqual(true);
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
          [{ data: 'data point 1a' }, { data: 'data point 1b' }],
          [{ data: 'data point 2a' }, { data: 'data point 2b' }],
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

  it('should render tag component for data with tag property', componentTester(setup, (harness) => {
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

  describe('input', () => {
    it('should render input component for data when question property of type: input', componentTester(setup, (harness) => {
      const context = {
        params: {
          ...mockContext.params,
          data: [
            [
              {
                question: {
                  type: 'input',
                  id: 'some-id',
                  data: 'The data goes here',
                },
              },
            ],
          ],
        },
      };

      harness.request(context, ($) => {
        const input = $('[data-test-id="question-some-id"] input');
        expect(input.val()).toEqual(context.params.data[0][0].question.data);
        expect(input.hasClass('nhsuk-input this is a class')).toEqual(false);
      });
    }));

    it('should render error in input component for data when question property of type: input and there is error', componentTester(setup, (harness) => {
      const context = {
        params: {
          ...mockContext.params,
          data: [
            [
              {
                question: {
                  type: 'input',
                  id: 'some-id',
                  data: 'The data goes here',
                  error: { message: 'error message' },
                },
              },
            ],
          ],
        },
      };

      harness.request(context, ($) => {
        const inputError = $('[data-test-id="question-some-id"]  .nhsuk-error-message');
        expect(inputError.text().trim()).toEqual('Error: error message');
      });
    }));

    it('should render expandableSection component for data when question has property expandableSection', componentTester(setup, (harness) => {
      const context = {
        params: {
          ...mockContext.params,
          data: [
            [
              {
                question: {
                  type: 'input',
                  id: 'some-id',
                  data: 'The data goes here',
                },
                expandableSection: {
                  dataTestId: 'some-expandableSection-id',
                  title: 'ExpandableSection title',
                  innerComponent: 'Some inner component',
                },
              },
            ],
          ],
        },
      };

      harness.request(context, ($) => {
        const expandableSection = $('[data-test-id="some-expandableSection-id"]');
        expect(expandableSection.find('span').text().trim()).toEqual('ExpandableSection title');
        expect(expandableSection.find('.nhsuk-details__text').text().trim()).toEqual('Some inner component');
      });
    }));

    it('should render the input component with correct classes if columnInfo is passed in as string', componentTester(setup, (harness) => {
      const context = {
        params: {
          ...mockContext.params,
          data: [
            [
              {
                question: {
                  type: 'input',
                  id: 'some-id',
                  data: 'The data goes here',
                },
                classes: 'this is a class',
              },
            ],
          ],
        },
      };


      harness.request(context, ($) => {
        const input = $('[data-test-id="question-some-id"] input');
        expect(input.val()).toEqual(context.params.data[0][0].question.data);
        expect(input.hasClass('nhsuk-input this is a class')).toEqual(true);
      });
    }));
  });

  it('should render checkboxes component for data when question property of type: checkbox', componentTester(setup, (harness) => {
    const context = {
      params: {
        ...mockContext.params,
        data: [
          [
            {
              question: {
                type: 'checkbox',
                id: 'someId',
                name: 'checkboxName',
                value: 'checkBoxValueSentInForm',
                text: 'some other text here',
                checked: true,
              },
              dataTestId: 'checkbox-question-id',
            },
          ],
        ],
      },
    };

    harness.request(context, ($) => {
      const checkboxInput = $('[data-test-id="checkbox-question-id"] input');
      expect(checkboxInput.length).toEqual(1);
      expect(checkboxInput.attr('id')).toEqual('someId');
      expect(checkboxInput.attr('name')).toEqual('checkboxName');
      expect(checkboxInput.attr('type')).toEqual('checkbox');
      expect(checkboxInput.attr('checked')).toEqual('checked');
      expect(checkboxInput.attr('value')).toEqual('checkBoxValueSentInForm');
    });
  }));

  describe('multiLine', () => {
    it('should render the table rows with multiLine text  passed in', componentTester(setup, (harness) => {
      const context = {
        params: {
          columnInfo: [
            { data: 'column 1 heading' },
          ],
          data: [
            [{ multiLine: { data: ['first line', 'second line', '', 'blank line'], dataTestId: 'some-id' } }],
          ],
        },
      };
      harness.request(context, ($) => {
        const multiLineDiv = $('[data-test-id="some-id"]');

        expect(multiLineDiv.length).toEqual(1);
        expect(multiLineDiv.find('div').length).toEqual(4);
        expect(multiLineDiv.find('div:nth-child(1)').text().trim()).toEqual('first line');
        expect(multiLineDiv.find('div:nth-child(2)').text().trim()).toEqual('second line');
        expect(multiLineDiv.find('div:nth-child(3)').text().trim()).toEqual('');
        expect(multiLineDiv.find('div:nth-child(4)').text().trim()).toEqual('blank line');
      });
    }));
  });
});
