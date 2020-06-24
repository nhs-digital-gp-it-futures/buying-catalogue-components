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

  describe('table data', () => {
    it('should render a single row and column', componentTester(setup, (harness) => {
      const context = {
        params: {
          data: [
            [{}],
          ],
        },
      };

      harness.request(context, ($) => {
        const tableRow = $('tr[data-test-id="table-row-0"]');

        expect(tableRow.length).toEqual(1);
        expect(tableRow.find('td').length).toEqual(1);
      });
    }));

    it('should render the cell as a link if a href property is provided', componentTester(setup, (harness) => {
      const context = {
        params: {
          data: [
            [{ data: 'some link', href: '/some-link', dataTestId: 'link-cell' }],
          ],
        },
      };

      harness.request(context, ($) => {
        const tableLinkCell = $('[data-test-id="link-cell"]');

        expect(tableLinkCell.text().trim()).toEqual('some link');
        expect(tableLinkCell.attr('href')).toEqual('/some-link');
      });
    }));

    it('should render the cell as a tag component if a tag property is provided', componentTester(setup, (harness) => {
      const context = {
        params: {
          data: [
            [{ tag: { dataTestId: 'tag-cell', text: 'tag text', classes: 'bc-c-tag-outline' } }],
          ],
        },
      };

      harness.request(context, ($) => {
        const tableTagCell = $('[data-test-id="tag-cell"]');

        expect(tableTagCell.text().trim()).toEqual('tag text');
        expect(tableTagCell.hasClass('bc-c-tag-outline')).toEqual(true);
      });
    }));

    it('should render the table rows with multiLine text passed in', componentTester(setup, (harness) => {
      const context = {
        params: {
          data: [
            [{ multiLine: { data: ['first line', 'second line', '', 'blank line'], dataTestId: 'multiLine-cell' } }],
          ],
        },
      };
      harness.request(context, ($) => {
        const tableMultiLineCell = $('[data-test-id="multiLine-cell"]');

        expect(tableMultiLineCell.length).toEqual(1);
        expect(tableMultiLineCell.find('div').length).toEqual(4);
        expect(tableMultiLineCell.find('div:nth-child(1)').text().trim()).toEqual('first line');
        expect(tableMultiLineCell.find('div:nth-child(2)').text().trim()).toEqual('second line');
        expect(tableMultiLineCell.find('div:nth-child(3)').text().trim()).toEqual('');
        expect(tableMultiLineCell.find('div:nth-child(4)').text().trim()).toEqual('blank line');
      });
    }));

    describe('input', () => {
      const context = {
        params: {
          data: [
            [
              {
                question: {
                  type: 'input', data: 'some inputted data', id: 'some-question-id',
                },
                classes: 'some-input-class',
                dataTestId: 'input-cell',
              },
            ],
          ],
        },
      };

      it('should render the cell as a text input if a question property is provided of type: input', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableInputCell = $('[data-test-id="input-cell"]');

          expect(tableInputCell.find('input').length).toEqual(1);
        });
      }));

      it('should render the input field with the data populated', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableInputCell = $('[data-test-id="input-cell"]');

          expect(tableInputCell.find('input').val()).toEqual('some inputted data');
        });
      }));

      it('should render the input field with any additional classes provided', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableInputCell = $('[data-test-id="input-cell"]');

          expect(tableInputCell.find('input').hasClass('some-input-class')).toEqual(true);
        });
      }));
    });

    describe('checkbox', () => {
      const context = {
        params: {
          data: [
            [
              {
                question: {
                  type: 'checkbox', text: 'checkbox text', value: 'checkbox-value', id: 'some-question-id', checked: true,
                },
                dataTestId: 'checkbox-cell',
              },
            ],
          ],
        },
      };

      it('should render the cell as a checkbox input if a question property is provided of type: checkbox', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableCheckboxCell = $('[data-test-id="checkbox-cell"]');

          expect(tableCheckboxCell.find('input').attr('type')).toEqual('checkbox');
        });
      }));

      it('should render the checkbox as checked', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableCheckboxCell = $('[data-test-id="checkbox-cell"]');

          expect(tableCheckboxCell.find('input:checked').length).toEqual(1);
        });
      }));

      it('should render the label of the checkbox', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableCheckboxCell = $('[data-test-id="checkbox-cell"]');

          expect(tableCheckboxCell.find('label').text().trim()).toEqual('checkbox text');
        });
      }));
    });

    it('should render the cell as a just text if only data property is provided', componentTester(setup, (harness) => {
      const context = {
        params: {
          data: [
            [{ data: 'some text', dataTestId: 'text-cell', classes: 'some-text-classes' }],
          ],
        },
      };

      harness.request(context, ($) => {
        const tableTextCell = $('[data-test-id="text-cell"]');

        expect(tableTextCell.text().trim()).toEqual('some text');
        expect(tableTextCell.hasClass('some-text-classes')).toEqual(true);
      });
    }));

    it('should render an expandable section to a cell if provided', componentTester(setup, (harness) => {
      const context = {
        params: {
          data: [
            [{
              data: 'some text',
              dataTestId: 'text-cell',
              classes: 'some-text-classes',
              expandableSection: {
                dataTestId: 'some-expandableSection-id',
                title: 'ExpandableSection title',
                innerComponent: 'Some inner component',
              },
            }],
          ],
        },
      };

      harness.request(context, ($) => {
        const tableRow = $('[data-test-id="table-row-0"]');
        const tableCell = tableRow.find('td');
        const expandableSection = tableCell.find('[data-test-id="some-expandableSection-id"]');

        expect(expandableSection.find('span').text().trim()).toEqual('ExpandableSection title');
        expect(expandableSection.find('.nhsuk-details__text').text().trim()).toEqual('Some inner component');
      });
    }));

    it('should render a multiple rows and columns', componentTester(setup, (harness) => {
      const context = {
        params: {
          data: [
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
          ],
        },
      };

      harness.request(context, ($) => {
        const tableRows = $('tr');
        const tableRow1 = $('tr[data-test-id="table-row-0"]');
        const tableRow2 = $('tr[data-test-id="table-row-1"]');
        const tableRow3 = $('tr[data-test-id="table-row-2"]');

        expect(tableRows.length).toEqual(3);
        expect(tableRow1.find('td').length).toEqual(3);
        expect(tableRow2.find('td').length).toEqual(3);
        expect(tableRow3.find('td').length).toEqual(3);
      });
    }));
  });
});
