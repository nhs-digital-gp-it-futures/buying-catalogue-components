import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'textareaFieldNoCount',
    path: 'components/input/components/textarea-field-no-count/macro.njk',
  },
};

describe('textarea', () => {
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
      expect(question.find('span.nhsuk-hint').text().trim()).toEqual('Some not so important additional advice');
    });
  }));

  it('should render the text area', componentTester(setup, (harness) => {
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
      expect(question.find('textarea').length).toEqual(1);
    });
  }));

  it('should render the text area with specific amount of rows as specified in the context', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id: 'fieldId',
          rows: 10,
        },
      },
    };

    harness.request(context, ($) => {
      const question = $('div[data-test-id="question-fieldId"]');
      expect(question.find('textarea').attr('rows')).toEqual(' 10 ');
    });
  }));

  it('should render the text area with the data populated', componentTester(setup, (harness) => {
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
      expect(question.find('textarea').val()).toEqual('Some populated data');
    });
  }));

  it('should render the textarea-field as an error if the context provided contains an error', componentTester(setup, (harness) => {
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
      expect(question.find('.nhsuk-error-message').text().trim()).toEqual('Error: Some error message');
      expect(question.find('div[data-test-id="textarea-field-error"]').length).toEqual(1);
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
      expect(question.find('[data-test-id="textarea-field-footer"]').text().trim()).toEqual('Some footer based advice');
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
      const mainAdviceLabel = $('div[data-test-id="textarea-field"] label');

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
      const mainAdviceLabel = $('div[data-test-id="textarea-field"] label');

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
      expect($('div[data-test-id="textarea-field"] .nhsuk-hint').length).toEqual(0);
    });
  }));
});
