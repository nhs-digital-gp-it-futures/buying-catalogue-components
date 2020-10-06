import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcTable',
    path: 'components/general/components/bc-table/macro.njk',
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
      const data = 'column 1 header';
      const context = {
        params: {
          columnInfo: [{
            data,
          }],
        },
      };

      harness.request(context, ($) => {
        const column1Heading = $('[data-test-id="column-heading-0-data"]');

        expect(column1Heading.text().trim()).toEqual(data);
      });
    }));

    it('should render the expandable section of the column', componentTester(setup, (harness) => {
      const title = 'ExpandableSection title 1';
      const innerComponent = 'Some inner text';
      const context = {
        params: {
          columnInfo: [{
            data: 'column 1 header',
            expandableSection: {
              dataTestId: 'view-section-some-section-id',
              title,
              innerComponent,
            },
          }],
        },
      };

      harness.request(context, ($) => {
        const column1ExpandableHeading = $('[data-test-id="column-heading-0-expandable"]');

        expect(column1ExpandableHeading.length).toEqual(1);
        expect(column1ExpandableHeading.find('span').text().trim()).toEqual(title);
        expect(column1ExpandableHeading.find('.nhsuk-details__text').text().trim()).toEqual(innerComponent);
      });
    }));

    it('should render the hint section of the column', componentTester(setup, (harness) => {
      const additionalAdvice = 'For example 14 01 2020';
      const context = {
        params: {
          columnInfo: [{
            data: 'column 1 header',
            additionalAdvice,
          }],
        },
      };

      harness.request(context, ($) => {
        const column1HintHeading = $('[data-test-id="column-heading-0-hint"]');

        expect(column1HintHeading.length).toEqual(1);
        expect(column1HintHeading.text().trim()).toEqual(additionalAdvice);
      });
    }));

    it('should render any additional classes to the column heading', componentTester(setup, (harness) => {
      const classes = 'some-extra-class';
      const context = {
        params: {
          columnInfo: [{
            classes,
          }],
        },
      };

      harness.request(context, ($) => {
        const column1Heading = $('[data-test-id="column-heading-0"]');

        expect(column1Heading.attr('class')).toContain(classes);
      });
    }));

    it('should render the column to the width provided', componentTester(setup, (harness) => {
      const width = '30%';
      const context = {
        params: {
          columnInfo: [{
            width,
          }],
        },
      };

      harness.request(context, ($) => {
        const column1Heading = $('[data-test-id="column-heading-0"]');

        expect(column1Heading.attr('style')).toContain(`width:${width}`);
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

    it('should render the cell without a border bottom if the hideSeperator is provided', componentTester(setup, (harness) => {
      const context = {
        params: {
          data: [
            [{ hideSeperator: true }],
          ],
        },
      };

      harness.request(context, ($) => {
        expect($('td').attr('style')).toEqual('border-bottom-style: none');
      });
    }));

    it('should render the cell with a border bottom if the hideSeperator is not provided', componentTester(setup, (harness) => {
      const context = {
        params: {
          data: [
            [{}],
          ],
        },
      };

      harness.request(context, ($) => {
        expect($('td').attr('style')).toEqual('border-bottom-style: solid');
      });
    }));

    it('should render the cell as a link if a href property is provided', componentTester(setup, (harness) => {
      const data = 'some link';
      const href = '/some-link';
      const dataTestId = 'link-cell';

      const context = {
        params: {
          data: [
            [{ data, href, dataTestId }],
          ],
        },
      };

      harness.request(context, ($) => {
        const tableLinkCell = $(`[data-test-id="${dataTestId}"]`);

        expect(tableLinkCell.text().trim()).toEqual(data);
        expect(tableLinkCell.attr('href')).toEqual(href);
      });
    }));

    it('should render the cell as a tag component if a tag property is provided', componentTester(setup, (harness) => {
      const dataTestId = 'tag-cell';
      const text = 'tag text';
      const classes = 'bc-c-tag-outline';
      const context = {
        params: {
          data: [
            [{ tag: { dataTestId, text, classes } }],
          ],
        },
      };

      harness.request(context, ($) => {
        const tableTagCell = $(`[data-test-id="${dataTestId}"]`);

        expect(tableTagCell.text().trim()).toEqual(text);
        expect(tableTagCell.hasClass(classes)).toEqual(true);
      });
    }));

    it('should render the table rows with multiLine text passed in', componentTester(setup, (harness) => {
      const data = ['first line', 'second line', '', 'blank line'];
      const dataTestId = 'multiLine-cell';
      const context = {
        params: {
          data: [
            [{ multiLine: { data, dataTestId } }],
          ],
        },
      };
      harness.request(context, ($) => {
        const tableMultiLineCell = $(`[data-test-id="${dataTestId}"]`);

        expect(tableMultiLineCell.length).toEqual(1);
        expect(tableMultiLineCell.find('div').length).toEqual(4);
        expect(tableMultiLineCell.find('div:nth-child(1)').text().trim()).toEqual(data[0]);
        expect(tableMultiLineCell.find('div:nth-child(2)').text().trim()).toEqual(data[1]);
        expect(tableMultiLineCell.find('div:nth-child(3)').text().trim()).toEqual(data[2]);
        expect(tableMultiLineCell.find('div:nth-child(4)').text().trim()).toEqual(data[3]);
      });
    }));

    describe('input', () => {
      const data = 'some inputted data';
      const classes = 'some-input-class';
      const dataTestId = 'input-cell';
      const context = {
        params: {
          data: [
            [
              {
                question: {
                  type: 'input', data, id: 'some-question-id',
                },
                classes,
                dataTestId,
              },
            ],
          ],
        },
      };

      it('should render the cell as a text input if a question property is provided of type: input', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableInputCell = $(`[data-test-id="${dataTestId}"]`);

          expect(tableInputCell.find('input').length).toEqual(1);
        });
      }));

      it('should render the input field with the data populated', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableInputCell = $(`[data-test-id="${dataTestId}"]`);

          expect(tableInputCell.find('input').val()).toEqual(data);
        });
      }));

      it('should render the input field with any additional classes provided', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableInputCell = $(`[data-test-id="${dataTestId}"]`);

          expect(tableInputCell.find('input').hasClass(classes)).toEqual(true);
        });
      }));
    });

    describe('checkbox', () => {
      const type = 'checkbox';
      const text = 'checkbox text';
      const dataTestId = 'checkbox-cell';
      const context = {
        params: {
          data: [
            [
              {
                question: {
                  type, text, value: 'checkbox-value', id: 'some-question-id', checked: true,
                },
                dataTestId,
              },
            ],
          ],
        },
      };

      it('should render the cell as a checkbox input if a question property is provided of type: checkbox', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableCheckboxCell = $(`[data-test-id="${dataTestId}"]`);

          expect(tableCheckboxCell.find('input').attr('type')).toEqual(type);
        });
      }));

      it('should render the checkbox as checked', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableCheckboxCell = $(`[data-test-id="${dataTestId}"]`);

          expect(tableCheckboxCell.find('input:checked').length).toEqual(1);
        });
      }));

      it('should render the label of the checkbox', componentTester(setup, (harness) => {
        harness.request(context, ($) => {
          const tableCheckboxCell = $(`[data-test-id="${dataTestId}"]`);

          expect(tableCheckboxCell.find('label').text().trim()).toEqual(text);
        });
      }));
    });

    describe('date', () => {
      it('should render the input fields', componentTester(setup, (harness) => {
        const context = {
          params: {
            data: [
              [
                {
                  question: {
                    type: 'date',
                    id: 'fieldId',
                    mainAdvice: 'Some really important main advice',
                    additionalAdvice: 'Some not so important additional advice',
                  },
                },
              ],
            ],
          },
        };

        harness.request(context, ($) => {
          const question = $('div[data-test-id="question-fieldId"]');
          expect(question.find('#fieldId-day').length).toEqual(1);
          expect(question.find('#fieldId-month').length).toEqual(1);
          expect(question.find('#fieldId-year').length).toEqual(1);
        });
      }));

      it('should render the input fields with the data populated', componentTester(setup, (harness) => {
        const context = {
          params: {
            data: [
              [
                {
                  question: {
                    id: 'fieldId',
                    type: 'date',
                    mainAdvice: 'Some really important main advice',
                    additionalAdvice: 'Some not so important additional advice',
                    data: {
                      day: '15',
                      month: '03',
                      year: '1996',
                    },
                  },
                },
              ],
            ],
          },
        };

        harness.request(context, ($) => {
          const question = $('div[data-test-id="question-fieldId"]');
          expect(question.find('#fieldId-day').val()).toEqual('15');
          expect(question.find('#fieldId-month').val()).toEqual('03');
          expect(question.find('#fieldId-year').val()).toEqual('1996');
        });
      }));

      it('should render the date field as an error if the context provided contains an error', componentTester(setup, (harness) => {
        const context = {
          params: {
            data: [
              [
                {
                  question: {
                    id: 'fieldId',
                    type: 'date',
                    mainAdvice: 'Some really important main advice',
                    additionalAdvice: 'Some not so important additional advice',
                    error: {
                      fields: ['day'],
                      message: 'Some error message',
                    },
                  },
                },
              ],
            ],
          },
        };

        harness.request(context, ($) => {
          const question = $('div[data-test-id="question-fieldId"]');
          const inputError = question.find('div[data-test-id="date-field-input-error"] .nhsuk-error-message');

          expect(inputError.length).toEqual(1);
          expect(inputError.text().trim()).toEqual('Error: Some error message');
        });
      }));

      it('should add error class to day field if "day" is in the error fields array', componentTester(setup, (harness) => {
        const context = {
          params: {
            data: [
              [
                {
                  question: {
                    id: 'fieldId',
                    type: 'date',
                    mainAdvice: 'Some really important main advice',
                    additionalAdvice: 'Some not so important additional advice',
                    error: {
                      fields: ['day'],
                      message: 'Some error message',
                    },
                  },
                },
              ],
            ],
          },
        };

        harness.request(context, ($) => {
          const dayInput = $('#fieldId-day');
          expect(dayInput.length).toEqual(1);
          expect(dayInput.hasClass('nhsuk-input--error')).toBeTruthy();

          const monthInput = $('#fieldId-month');
          expect(monthInput.length).toEqual(1);
          expect(monthInput.hasClass('nhsuk-input--error')).toBeFalsy();

          const yearInput = $('#fieldId-year');
          expect(yearInput.length).toEqual(1);
          expect(yearInput.hasClass('nhsuk-input--error')).toBeFalsy();
        });
      }));

      it('should add error class to month field if "month" is in the error fields array', componentTester(setup, (harness) => {
        const context = {
          params: {
            data: [
              [
                {
                  question: {
                    id: 'fieldId',
                    type: 'date',
                    mainAdvice: 'Some really important main advice',
                    additionalAdvice: 'Some not so important additional advice',
                    error: {
                      fields: ['month'],
                      message: 'Some error message',
                    },
                  },
                },
              ],
            ],
          },
        };

        harness.request(context, ($) => {
          const dayInput = $('#fieldId-day');
          expect(dayInput.length).toEqual(1);
          expect(dayInput.hasClass('nhsuk-input--error')).toBeFalsy();

          const monthInput = $('#fieldId-month');
          expect(monthInput.length).toEqual(1);
          expect(monthInput.hasClass('nhsuk-input--error')).toBeTruthy();

          const yearInput = $('#fieldId-year');
          expect(yearInput.length).toEqual(1);
          expect(yearInput.hasClass('nhsuk-input--error')).toBeFalsy();
        });
      }));

      it('should add error class to year field if "year" is in the error fields array', componentTester(setup, (harness) => {
        const context = {
          params: {
            data: [
              [
                {
                  question: {
                    id: 'fieldId',
                    type: 'date',
                    mainAdvice: 'Some really important main advice',
                    additionalAdvice: 'Some not so important additional advice',
                    error: {
                      fields: ['year'],
                      message: 'Some error message',
                    },
                  },
                },
              ],
            ],
          },
        };

        harness.request(context, ($) => {
          const dayInput = $('#fieldId-day');
          expect(dayInput.length).toEqual(1);
          expect(dayInput.hasClass('nhsuk-input--error')).toBeFalsy();

          const monthInput = $('#fieldId-month');
          expect(monthInput.length).toEqual(1);
          expect(monthInput.hasClass('nhsuk-input--error')).toBeFalsy();

          const yearInput = $('#fieldId-year');
          expect(yearInput.length).toEqual(1);
          expect(yearInput.hasClass('nhsuk-input--error')).toBeTruthy();
        });
      }));

      it('should render the footer advice', componentTester(setup, (harness) => {
        const context = {
          params: {
            data: [
              [
                {
                  question: {
                    id: 'fieldId',
                    type: 'date',
                    mainAdvice: 'Some really important main advice',
                    additionalAdvice: 'Some not so important additional advice',
                    footerAdvice: 'Some footer based advice',
                  },
                },
              ],
            ],
          },
        };

        harness.request(context, ($) => {
          const question = $('div[data-test-id="question-fieldId"]');
          expect(question.find('[data-test-id="date-field-footer"]').text().trim()).toEqual('Some footer based advice');
        });
      }));

      it('should render the correct label classes', componentTester(setup, (harness) => {
        const context = {
          params: {
            data: [
              [
                {
                  question: {
                    id: 'fieldId',
                    type: 'date',
                    mainAdvice: 'Some really important main advice',
                    additionalAdvice: 'Some not so important additional advice',
                  },
                },
              ],
            ],
          },
        };

        harness.request(context, ($) => {
          const mainAdviceLabel = $('div[data-test-id="date-field-input"] legend.nhsuk-fieldset__legend');

          expect(mainAdviceLabel.hasClass('nhsuk-u-font-size-24')).toEqual(true);
          expect(mainAdviceLabel.hasClass('nhsuk-u-font-weight-bold')).toEqual(true);
          expect(mainAdviceLabel.hasClass('nhsuk-u-margin-bottom-2')).toEqual(true);
        });
      }));
    });

    it('should render the cell as a just text if only data property is provided', componentTester(setup, (harness) => {
      const data = 'some text';
      const dataTestId = 'text-cell';
      const classes = 'some-text-classes';
      const context = {
        params: {
          data: [
            [{ data, dataTestId, classes: 'some-text-classes' }],
          ],
        },
      };

      harness.request(context, ($) => {
        const tableTextCell = $(`[data-test-id="${dataTestId}"]`);

        expect(tableTextCell.text().trim()).toEqual(data);
        expect(tableTextCell.hasClass(classes)).toEqual(true);
      });
    }));

    it('should render an expandable section to a cell if provided', componentTester(setup, (harness) => {
      const title = 'ExpandableSection title';
      const dataTestId = 'some-expandableSection-id';
      const innerComponent = 'Some inner component';
      const context = {
        params: {
          data: [
            [{
              data: 'some text',
              dataTestId: 'text-cell',
              classes: 'some-text-classes',
              expandableSection: {
                dataTestId,
                title,
                innerComponent,
              },
            }],
          ],
        },
      };

      harness.request(context, ($) => {
        const tableRow = $('[data-test-id="table-row-0"]');
        const tableCell = tableRow.find('td');
        const expandableSection = tableCell.find(`[data-test-id="${dataTestId}"]`);

        expect(expandableSection.find('span').text().trim()).toEqual(title);
        expect(expandableSection.find('.nhsuk-details__text').text().trim()).toEqual(innerComponent);
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
