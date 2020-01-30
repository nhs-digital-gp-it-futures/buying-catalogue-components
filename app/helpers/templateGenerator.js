const fs = require('fs');

const generateJSON = ({
  key,
  value,
  isLast,
  showKey = true,
  blockType,
}) => {
  const translationMap = {
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

  const isDisplay = blockType === 'display';

  const opts = translationMap[isDisplay ? 'display' : 'code'];

  let html = isDisplay ? '' : '<div class="bcc-c-code-nested">';

  html += showKey ? `${isDisplay ? '' : '<label class="bcc-c-code-key-label bcc-u-code-secondary-color">'}"${key}": ${isDisplay ? '' : '</label>'}` : '';

  if (typeof value === 'string') {
    html += `${isDisplay ? '' : '<span class="bcc-c-code-editable-content bcc-u-code-primary-color">'}"${isDisplay ? '' : '<span contenteditable="true">'}`;
    html += `${value.replace(opts.regex1, opts.string1).replace(opts.regex2, opts.string2)}`;
    html += `${isDisplay ? '' : '</span>'}"${isDisplay ? '' : '</span>'}${isLast ? ' ' : ','}${isDisplay ? '' : '<br>'}`;
  } else if (Array.isArray(value)) {
    html += '[';
    html += isDisplay ? '' : '<br><div class="bcc-c-code-json-array">';
    html += value.map((val, index) => generateJSON({
      key: index,
      value: val,
      isLast: index + 1 === Object.keys(value).length,
      showKey: false,
      blockType,
    })).join('');
    html += isDisplay ? '' : '</div>';
    html += ']';
    html += isLast ? ' ' : ',';
    html += isDisplay ? '' : '<br>';
  } else {
    html += '{';
    html += isDisplay ? '' : '<br><div class="bcc-c-code-json-object">';
    html += Object.entries(value).map(([k, v], index) => generateJSON({
      key: k,
      value: v,
      isLast: index + 1 === Object.keys(value).length,
      blockType,
    })).join('');
    html += isDisplay ? '' : '</div>';
    html += '}';
    html += isLast ? ' ' : ',';
    html += isDisplay ? '' : '<br>';
  }


  html += isDisplay ? '' : '</div>';

  return html;
};

const generateBlock = (params, blockType) => (
  Object.entries(params).map(([key, value], index) => generateJSON({
    key,
    value,
    isLast: index + 1 === Object.keys(params).length,
    blockType,
  })).join('')
);


// const generateEditableCode = (params, isDisplay = false) => (
//   Object.entries(params).map(([key, value], index) => generateJSON({
//     key,
//     value,
//     isLast: index + 1 === Object.keys(params).length,
//     isDisplay,
//   })).join('')
// );

// const generateDisplayCode = params => generateEditableCode(params, true);

const getSettings = (name, type) => {
  const settingsString = fs.readFileSync(`app/${type}s/${name}/settings.json`, 'utf-8');
  return JSON.parse(settingsString);
};

const writeTemplate = (template, name, type) => {
  const directory = 'app/templates';
  const subDirectory = `${directory}/${type}s`;
  if (!fs.existsSync(directory)) fs.mkdirSync(directory);
  if (!fs.existsSync(subDirectory)) fs.mkdirSync(subDirectory);
  fs.writeFileSync(`${subDirectory}/${name}-template.njk`, template);
};

const generateTemplate = ({
  name,
  formParams = {},
  templateType: type,
}) => {
  const { componentName, params: paramsFromSettings } = getSettings(name, type);
  const paramsToUse = Object.keys(formParams).length > 0 ? formParams : paramsFromSettings;

  const codeBlock = generateBlock(paramsToUse, 'code');
  const displayBlock = generateBlock(paramsToUse, 'display');

  const importCode = `{% <span class="bcc-u-code-primary-color">from</span> <span class="bcc-u-code-secondary-color">'${type}s/${name}/macro.njk'</span> <span class="bcc-u-code-primary-color">import</span> ${componentName} %}`;

  const renderedComponentCode = `${importCode}<br><br> {{ ${componentName}({<div id="json-params" class="bcc-c-code-json-block">${codeBlock}</div>}) }}`;
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

    <div>
      <form method="post" action="/${type}/${name}" id="try-params" class="nhsuk-u-clear">
        <h3 class="bcc-c-code-title">To use the ${type} <button type="submit" form="try-params" class="nhsuk-u-margin-top-4 nhsuk-u-margin-right-4 nhsuk-u-font-size-16 bcc-c-try-button">Try it out</button></h3>
        <div class="bcc-c-code-block">
          {% verbatim %}
              ${renderedComponentCode}
          {% endverbatim %}
        </div>
      </form>
    </div>

    <div id="display-block">
      <h3 class="bcc-c-display-title">Rendered ${type}</h3>
      <div class="bcc-c-display-block">
        ${renderedComponentDisplay}
      </div>
    </div>
    {% endblock %}
  `, name, type);
};

module.exports = {
  generateTemplate,
};
