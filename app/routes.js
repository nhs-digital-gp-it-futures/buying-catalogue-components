import express from 'express';
import nunjucks from 'nunjucks';

const router = express.Router();

router.get('/', async (req, res) => {
  const macroWrapper = `
    {% extends 'includes/layout.njk' %}
    {% from './error-summary.njk' import errorSummary %}
    {% block body %}
    {{ errorSummary(errors) }}
    {% endblock %}`;

  const context = {
    errors: [
      {
        text: 'This is the first error',
        href: '#link-to-first-error',
      },
    ],
  };

  const viewToTest = nunjucks.renderString(macroWrapper, context);

  res.send(viewToTest);
});

module.exports = router;
