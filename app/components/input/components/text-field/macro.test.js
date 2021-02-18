import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'textField',
    path: 'components/input/components/text-field/macro.njk',
  },
};

describe('textField', () => {
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
      expect(question.find('label.nhsuk-label').text().trim()).toEqual('Some really important main advice');
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

  it('should render the input text field', componentTester(setup, (harness) => {
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
      expect(question.find('input').length).toEqual(1);
    });
  }));

  it('should render the text field with the data populated', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id: 'fieldId',
          mainAdvice: 'Some really important main advice',
          additionalAdvice: 'Some not so important additional advice',
          data: 'Some populated data',
        },
      },
    };

    harness.request(context, ($) => {
      const question = $('div[data-test-id="question-fieldId"]');
      expect(question.find('div[data-test-id="question-fieldId"] input').val()).toEqual('Some populated data');
    });
  }));

  it('should render the text field as an error if the context provided contains an error', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id: 'fieldId',
          mainAdvice: 'Some really important main advice',
          additionalAdvice: 'Some not so important additional advice',
          data: 'Some populated data',
          error: {
            message: 'Some error message',
          },
        },
      },
    };

    harness.request(context, ($) => {
      const question = $('div[data-test-id="question-fieldId"]');
      const inputError = question.find('div[data-test-id="text-field-input-error"] .nhsuk-error-message');

      expect(inputError.length).toEqual(1);
      expect(inputError.text().trim()).toEqual('Error: Some error message');
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
      expect(question.find('[data-test-id="text-field-footer"]').text().trim()).toEqual('Some footer based advice');
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
      const mainAdviceLabel = $('div[data-test-id="text-field-input"] label');

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
      const mainAdviceLabel = $('div[data-test-id="text-field-input"] label');

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

  it('should render any additional classes provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id: 'fieldId',
        },
        classes: 'some-other-class',
      },
    };

    harness.request(context, ($) => {
      const textFieldInput = $('div[data-test-id="text-field-input"] input');

      expect(textFieldInput.hasClass('some-other-class')).toEqual(true);
    });
  }));
});
