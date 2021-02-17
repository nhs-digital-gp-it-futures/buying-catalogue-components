import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'dateField',
    path: 'components/input/components/date-field/macro.njk',
  },
};

describe('dateField', () => {
  it('should render the main advice', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id: 'fieldId',
          mainAdvice: 'Some really important main advice',
          additionalAdvice: 'Some not so important additional advice',
        },
      },
    };

    harness.request(context, ($) => {
      const question = $('div[data-test-id="question-fieldId"]');
      expect(question.find('legend.nhsuk-fieldset__legend').text().trim()).toEqual('Some really important main advice');
    });
  }));

  it('should render the additional advice', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id: 'fieldId',
          mainAdvice: 'Some really important main advice',
          additionalAdvice: 'Some not so important additional advice',
        },
      },
    };

    harness.request(context, ($) => {
      const question = $('div[data-test-id="question-fieldId"]');
      expect(question.find('.nhsuk-hint').text().trim()).toEqual('Some not so important additional advice');
    });
  }));

  it('should render the input fields', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id: 'fieldId',
          mainAdvice: 'Some really important main advice',
          additionalAdvice: 'Some not so important additional advice',
        },
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
        question: {
          id: 'fieldId',
          mainAdvice: 'Some really important main advice',
          additionalAdvice: 'Some not so important additional advice',
          data: {
            day: '15',
            month: '03',
            year: '1996',
          },
        },
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
        question: {
          id: 'fieldId',
          mainAdvice: 'Some really important main advice',
          additionalAdvice: 'Some not so important additional advice',
          error: {
            fields: ['day'],
            message: 'Some error message',
          },
        },
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
        question: {
          id: 'fieldId',
          mainAdvice: 'Some really important main advice',
          additionalAdvice: 'Some not so important additional advice',
          error: {
            fields: ['day'],
            message: 'Some error message',
          },
        },
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
        question: {
          id: 'fieldId',
          mainAdvice: 'Some really important main advice',
          additionalAdvice: 'Some not so important additional advice',
          error: {
            fields: ['month'],
            message: 'Some error message',
          },
        },
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
        question: {
          id: 'fieldId',
          mainAdvice: 'Some really important main advice',
          additionalAdvice: 'Some not so important additional advice',
          error: {
            fields: ['year'],
            message: 'Some error message',
          },
        },
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
        question: {
          id: 'fieldId',
          mainAdvice: 'Some really important main advice',
          additionalAdvice: 'Some not so important additional advice',
          footerAdvice: 'Some footer based advice',
        },
      },
    };

    harness.request(context, ($) => {
      const question = $('div[data-test-id="question-fieldId"]');
      expect(question.find('[data-test-id="date-field-footer"]').text().trim()).toEqual('Some footer based advice');
    });
  }));

  it('should render the correct label classes if is part of a multi question', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id: 'fieldId',
          mainAdvice: 'main advice for question',
        },
        isMultiQuestion: true,
      },
    };

    harness.request(context, ($) => {
      const mainAdviceLabel = $('div[data-test-id="date-field-input"] legend.nhsuk-fieldset__legend');

      expect(mainAdviceLabel.hasClass('nhsuk-u-font-size-19')).toEqual(true);
      expect(mainAdviceLabel.hasClass('nhsuk-u-font-weight-bold')).toEqual(true);
      expect(mainAdviceLabel.hasClass('nhsuk-u-margin-bottom-2')).toEqual(true);
    });
  }));

  it('should render the correct label classes if is not part of a multi question', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id: 'fieldId',
          mainAdvice: 'main advice for question',
        },
      },
    };

    harness.request(context, ($) => {
      const mainAdviceLabel = $('div[data-test-id="date-field-input"] legend.nhsuk-fieldset__legend');

      expect(mainAdviceLabel.hasClass('nhsuk-u-font-size-24')).toEqual(true);
      expect(mainAdviceLabel.hasClass('nhsuk-u-font-weight-bold')).toEqual(true);
      expect(mainAdviceLabel.hasClass('nhsuk-u-margin-bottom-2')).toEqual(true);
    });
  }));

  it('should not render any additional advice if not provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id: 'fieldId',
          mainAdvice: 'main advice for question',
        },
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="text-field-input"] .nhsuk-hint').length).toEqual(0);
    });
  }));
});
