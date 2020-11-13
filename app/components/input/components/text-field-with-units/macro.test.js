import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'textFieldWithUnits',
    path: 'components/input/components/text-field-with-units/macro.njk',
  },
};

const id = 'fieldId';
const mainAdvice = 'Some really important main advice';
const data = 'Some populated data';
const message = 'Some error message';
const classes = 'some-other-class';

describe('textFieldWith Unit', () => {
  it('should render the main advice', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id,
          mainAdvice,
        },
      },
    };

    harness.request(context, ($) => {
      const question = $('div[data-test-id="question-fieldId"]');
      console.log(question.html());
      expect(question.find('label.nhsuk-label').text().trim()).toEqual(mainAdvice);
    });
  }));

  it('should render the input text field', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id,
          mainAdvice,
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
          id,
          mainAdvice,
          data,
        },
      },
    };

    harness.request(context, ($) => {
      const question = $('div[data-test-id="question-fieldId"]');
      expect(question.find('div[data-test-id="question-fieldId"] input').val()).toEqual(data);
    });
  }));

  it('should render the text field as an error if the context provided contains an error', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id,
          mainAdvice,
          data,
          error: {
            message,
          },
        },
      },
    };

    harness.request(context, ($) => {
      const question = $('div[data-test-id="question-fieldId"]');
      const inputError = question.find('div[data-test-id="text-field-input-error"] .nhsuk-error-message');

      expect(inputError.length).toEqual(1);
      expect(inputError.text().trim()).toEqual(`Error: ${message}`);
    });
  }));

  it('should render the correct label classes', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id,
          mainAdvice,
        },
      },
    };

    harness.request(context, ($) => {
      const mainAdviceLabel = $('div[data-test-id="text-field-input"] label');

      expect(mainAdviceLabel.hasClass('nhsuk-u-font-size-19')).toEqual(true);
      expect(mainAdviceLabel.hasClass('nhsuk-u-font-weight-bold')).toEqual(true);
      expect(mainAdviceLabel.hasClass('nhsuk-u-margin-bottom-2')).toEqual(true);
    });
  }));

  it('should render any additional classes provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        question: {
          id,
        },
        classes,
      },
    };

    harness.request(context, ($) => {
      const textFieldInput = $('div[data-test-id="text-field-input"] input');

      expect(textFieldInput.hasClass(classes)).toEqual(true);
    });
  }));
});
