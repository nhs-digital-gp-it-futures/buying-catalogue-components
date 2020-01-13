const fs = require('fs');

const getInputFields = (params) => {
  const paramsInputString = Object.keys(params).map(param => `
    <div class="nhsuk-u-inline-block nhsuk-u-padding-4 nhsuk-u-padding-bottom-0">
      <label for="param" class="nhsuk-grid-column-one-quarter">${param}:</label>
      <input type="text" name="${param}" id="${param}" value="${params[param]}" class="nhsuk-grid-column-three-quarters nhsuk-u-font-size-16" style="line-height: 2em;"/>
    </div>
  `).join('');
  return `${paramsInputString}`;
};

const generateTemplate = ({
  component,
  componentName,
  params,
  type,
}) => {
  const paramsStringCode = Object.entries(params).reduce((acc, [key, value], i) => {
    let modifiedValue;
    if (value.includes('<') || value.includes('>')) {
      modifiedValue = value.replace(/</g, '&lt').replace(/>/g, '&gt;');
    } else modifiedValue = value;
    const keyValueString = (i !== 0)
      ? (`,\n        ${key}: ${JSON.stringify(modifiedValue)}`)
      : (`        ${key}: ${JSON.stringify(modifiedValue)}`);
    acc[0] += keyValueString;
    return acc;
  }, ['{\n', '\n      }']).join('');

  const paramsString = Object.entries(params).reduce((acc, [key, value], i) => {
    let modifiedValue;
    if (value.includes('&lt') || value.includes('&gt')) {
      modifiedValue = value.replace(/&lt/g, '<').replace(/&gt;/g, '>');
    } else modifiedValue = value;
    const keyValueString = (i !== 0)
      ? `, ${key}: ${JSON.stringify(modifiedValue)}`
      : `${key}: ${JSON.stringify(modifiedValue)}`;
    acc[0] += keyValueString;
    return acc;
  }, ['{', '}']).join('');

  const renderedComponentCode = `{{ ${componentName}(${paramsStringCode}) }}`;
  const renderedComponent = `{{ ${componentName}(${paramsString}) }}`;

  const template = `
{% extends 'views/includes/layout.njk' %}
{% from 'components/back-link/macro.njk' import backLink %}
{% from '${type}s/${component}/macro.njk' import ${componentName} %}

{% block body %}
  {{ backLink({
    "href": "/",
    "text": "Return to component list"
  }) }}
  <h1>${componentName} ${type}</h1>

  <h3>To use the ${type}</h3>
  <pre><code>
    {% verbatim %}
      {% from '${type}s/${component}/macro.njk' import ${componentName} %}

      ${renderedComponentCode}
    {% endverbatim %}
  </code></pre>

  <h3>Rendered ${type}</h3>
  <div style="background:white;">
  ${renderedComponent}
  </div>

  <div class="nhsuk-grid-row nhsuk-u-padding-4 nhsuk-u-margin-top-4 nhsuk-u-margin-left-0" style="background:#fff9c4;">
    <form method="post" action="/${type}/${component}" id="try-params" class="bc-u-clearfix">
    ${getInputFields(params)}
    <button type="submit" form="try-params" class="nhsuk-u-margin-top-4 nhsuk-u-margin-right-4 nhsuk-u-font-size-16" style="float:right;background-color:#007f3b;color:#fff;box-shadow:0 4px 0 #00401e;padding:6px 8px;box-sizing:border-box;border: 2px solid transparent;border-radius: 4px;font-weight: 600;">Try it out</button>
    </form>
  </div>
{% endblock %}
`;
  fs.writeFileSync('app/template.njk', template);
};

module.exports = {
  generateTemplate,
};
