const fs = require('fs');

const generateEditableJSON = ({
  key,
  value,
  isLast,
  showKey = true,
  isCode,
}) => {
  const newValue = typeof value === 'string' ? value.replace(/&lt/g, '<').replace(/&gt;/g, '>') : value;

  const options = {
    display: {
      regex1: /&lt/g,
      string1: '<',
      regex2: /&gt;/g,
      string2: '>',
    },
    code: {
      regex1: /</g,
      string1: '&lt',
      regex2: />/g,
      string2: '&gt;',
    },
  };

  const opts = options[isCode ? 'display' : 'code'];

  let html = isCode ? '' : '<div class="nested-code">';

  html += showKey ? `${isCode ? '' : '<label for="param">'}"${key}": ${isCode ? '' : '</label>'}` : '';

  if (typeof newValue === 'string') {
    html += `${isCode ? '' : '<span class="json-text-input">'}"${isCode ? '' : '<span contenteditable="true">'}`;
    html += `${newValue.replace(opts.regex1, opts.string1).replace(opts.regex2, opts.string2)}`;
    html += `${isCode ? '' : '</span>'}"${isCode ? '' : '</span>'}${isLast ? ' ' : ','}${isCode ? '' : '<br>'}`;
  } else if (Array.isArray(newValue)) {
    html += '[';
    html += isCode ? '' : '<br><div class="json-array">';
    html += newValue.map((val, index) => generateEditableJSON({ key: index, value: val, isLast: index + 1 === Object.keys(newValue).length, showKey: false, isCode })).join('');
    html += isCode ? '' : '</div>';
    html += ']';
    html += isLast ? ' ' : ',';
    html += isCode ? '' : '<br>';
  } else {
    html += '{';
    html += isCode ? '' : '<br><div class="json-object">';
    html += Object.entries(newValue).map(([k, v], index) => generateEditableJSON({ key: k, value: v, isLast: index + 1 === Object.keys(newValue).length, isCode })).join('');
    html += isCode ? '' : '</div>';
    html += '}';
    html += isLast ? ' ' : ',';
    html += isCode ? '' : '<br>';
  }


  html += isCode ? '' : '</div>';

  return html;
};

const generateEditableCode = (params, isCode = false) => Object.keys(params).map((key, index) => generateEditableJSON({ key, value: params[key], isLast: index + 1 === Object.keys(params).length, isCode })).join('');

const getSettings = (name, type) => {
  const settingsString = fs.readFileSync(`app/${type}s/${name}/settings.json`, 'utf-8');
  return JSON.parse(settingsString);
};

const writeTemplate = (template, name, type) => {
  const dir = `app/templates/${type}s`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(`${dir}/${name}-template.njk`, template);
};

const generateTemplate = ({
  name,
  formParams = {},
  templateType: type,
}) => {
  const settings = getSettings(name, type);
  const { componentName } = settings;
  const formParamsExist = Object.keys(formParams).length > 0;

  const params = formParamsExist ? formParams : settings.params;

  const codeBlock = generateEditableCode(params);
  const displayBlock = generateEditableCode(params, true);

  const importCode = `{% <span class="code-primary">from</span> <span class="code-secondary">'${type}s/${name}/macro.njk'</span> <span class="code-primary">import</span> ${componentName} %}`;

  const renderedComponentCode = `${importCode}<br><br> {{ ${componentName}({<div id="json-params" class="json-block">${codeBlock}</div>}) }}`;
  const renderedComponentDisplay = `{{ ${componentName}({${displayBlock}}) }}`;

  writeTemplate(`
    {% extends 'views/includes/layout.njk' %}
    {% from 'components/back-link/macro.njk' import backLink %}
    {% from '${type}s/${name}/macro.njk' import ${componentName} %}

    {% block body %}
      {{ backLink({
        "href": "/",
        "text": "Return to component list"
      }) }}

    <h1>${componentName} ${type}</h1>

    <div class="code-wrapper">
      <form method="post" action="/${type}/${name}" id="try-params" class="nhsuk-u-clear">
        <h3 class="code-title">To use the ${type} <button type="submit" form="try-params" class="nhsuk-u-margin-top-4 nhsuk-u-margin-right-4 nhsuk-u-font-size-16 bcc-c-try-button">Try it out</button></h3>
        <div class="code-block">
          {% verbatim %}
              ${renderedComponentCode}
          {% endverbatim %}
        </div>
      </form>
    </div>

    <div class="display-wrapper">
      <h3 class="display-title">Rendered ${type}</h3>
      <div class="display-block">
        ${renderedComponentDisplay}
      </div>
    </div>
    {% endblock %}
  `, name, type);
};

module.exports = {
  generateTemplate,
};
