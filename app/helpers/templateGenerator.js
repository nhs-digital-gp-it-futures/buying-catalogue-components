const fs = require('fs');

const getInputFields = (params) => {
  const paramsInputString = Object.entries(params).map(([key, value]) => {
    const modifiedValue = typeof value === 'string'
      ? value.replace(/&lt/g, '<').replace(/&gt;/g, '>')
      : value;
    return `
      <div class="nhsuk-u-inline-block nhsuk-u-padding-4 nhsuk-u-padding-bottom-0">
        <label for="param" class="nhsuk-grid-column-one-quarter">${key}:</label>
        <input type="text" name="${key}" id="${key}" value="${modifiedValue}" class="nhsuk-grid-column-three-quarters nhsuk-u-font-size-16"/>
      </div>
    `;
  }).join('');
  return paramsInputString;
};

const getParamStrings = (component, params, type) => {
  const options = {
    display: {
      regex1: /&lt/g,
      string1: '<',
      regex2: /&gt;/g,
      string2: '>',
      stringStart: ', ',
      stringStart0: '',
      accArray: ['{', '}'],
    },
    code: {
      regex1: /</g,
      string1: '&lt',
      regex2: />/g,
      string2: '&gt;',
      stringStart: ',\n        ',
      stringStart0: '        ',
      accArray: ['{\n', '\n      }'],
    },
  };
  const opts = options[type];

  return Object.entries(params).reduce((acc, [key, value], i) => {
    let modifiedValue;
    if (component === 'view-data-bulletlist' && key === 'data') {
      modifiedValue = (typeof value === 'string') ? value.split(',') : value;
    } else {
      modifiedValue = value.replace(opts.regex1, opts.string1).replace(opts.regex2, opts.string2);
    }
    const keyValueString = (i !== 0)
      ? (`${opts.stringStart}${key}: ${JSON.stringify(modifiedValue)}`)
      : (`${opts.stringStart0}${key}: ${JSON.stringify(modifiedValue)}`);
    acc[0] += keyValueString;
    return acc;
  }, opts.accArray).join('');
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

  const paramsStringCode = getParamStrings(component, params, 'code');

  const paramsString = getParamStrings(component, params, 'display');

  const renderedComponentCode = `{{ ${componentName}(${paramsStringCode}) }}`;
  const renderedComponentDisplay = `{{ ${componentName}(${paramsString}) }}`;

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
  ${renderedComponentDisplay}
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
