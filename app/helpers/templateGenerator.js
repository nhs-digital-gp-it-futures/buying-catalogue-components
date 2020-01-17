const fs = require('fs');

const getInputFields = (params) => {
  const paramsInputString = Object.entries(params).map(([key, value]) => {
    let modifiedValue;
    if (value.includes('&lt') || value.includes('&gt;')) {
      modifiedValue = value.replace(/&lt/g, '<').replace(/&gt;/g, '>');
    } else modifiedValue = value;
    return `
      <div class="nhsuk-u-inline-block nhsuk-u-padding-4 nhsuk-u-padding-bottom-0">
        <label for="param" class="nhsuk-grid-column-one-quarter">${key}:</label>
        <input type="text" name="${key}" id="${key}" value="${modifiedValue}" class="nhsuk-grid-column-three-quarters nhsuk-u-font-size-16"/>
      </div>
    `;
  }).join('');
  return paramsInputString;
};

const getSettings = (component) => {
  const settingsString = fs.readFileSync(`app/components/${component}/settings.json`, 'utf-8');
  return JSON.parse(settingsString);
};

const generateTemplate = ({
  component,
  formParams = {},
}) => {
  const settings = getSettings(component);
  const { componentName } = settings;
  const type = 'component';
  const formParamsExist = Object.keys(formParams).length > 0;

  const params = formParamsExist ? formParams : settings.params;

  const paramsStringCode = Object.entries(params).reduce((acc, [key, value], i) => {
    let modifiedValue;
    if (value.includes('<') || value.includes('>')) {
      modifiedValue = value.replace(/</g, '&lt').replace(/>/g, '&gt;');
    } else if (component === 'view-data-bulletlist' && key === 'data' && (typeof value === 'string')) {
      modifiedValue = value.split(',');
    } else modifiedValue = value;
    const keyValueString = (i !== 0)
      ? (`,\n        ${key}: ${JSON.stringify(modifiedValue)}`)
      : (`        ${key}: ${JSON.stringify(modifiedValue)}`);
    acc[0] += keyValueString;
    return acc;
  }, ['{\n', '\n      }']).join('');

  const paramsString = Object.entries(params).reduce((acc, [key, value], i) => {
    let modifiedValue;
    if (value.includes('&lt') || value.includes('&gt;')) {
      modifiedValue = value.replace(/&lt/g, '<').replace(/&gt;/g, '>');
    } else if (component === 'view-data-bulletlist' && key === 'data' && (typeof value === 'string')) {
      modifiedValue = value.split(',');
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
  <div class="bcc-t-bg-white">
  ${renderedComponent}
  </div>

  <div class="nhsuk-grid-row nhsuk-u-padding-4 nhsuk-u-margin-top-4 nhsuk-u-margin-left-0 bcc-t-bg-pale-yellow">
    <form method="post" action="/${type}/${component}" id="try-params" class="nhsuk-u-clear">
    ${getInputFields(params)}
    <button type="submit" form="try-params" class="nhsuk-u-margin-top-4 nhsuk-u-margin-right-4 nhsuk-u-font-size-16 bcc-c-try-button">Try it out</button>
    </form>
  </div>
{% endblock %}
`;
  const dir = 'app/templates';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  fs.writeFileSync(`${dir}/${component}-template.njk`, template);
};

module.exports = {
  generateTemplate,
};
