const fs = require('fs');

const translateKey = ({ key, blockType, showKey }) => {
  if (showKey) {
    const renderedKey = `"${key}": `;
    if (blockType === 'html') {
      return `<label class="bcc-c-code-key-label bcc-u-code-secondary-color">${renderedKey}</label>`;
    }
    return renderedKey;
  }
  return '';
};

const translateValueOfTypeString = ({ value, blockType, isLast }) => {
  const translationMap = {
    html: {
      lessThanRegex: /</g,
      lessThanString: '&lt',
      greaterThanRegex: />/g,
      greaterThanString: '&gt;',
    },
    json: {
      lessThanRegex: /&lt/g,
      lessThanString: '<',
      greaterThanRegex: /&gt;/g,
      greaterThanString: '>',
    },
  };

  const translator = translationMap[blockType];
  const isJson = blockType === 'json';

  let translatedValue = '';

  translatedValue += `${isJson ? '' : '<span class="bcc-c-code-editable-content bcc-u-code-primary-color">'}"${isJson ? '' : '<span contenteditable="true">'}`;
  translatedValue += `${value.replace(translator.lessThanRegex, translator.lessThanString).replace(translator.greaterThanRegex, translator.greaterThanString)}`;
  translatedValue += `${isJson ? '' : '</span>'}"${isJson ? '' : '</span>'}${isLast ? ' ' : ','}${isJson ? '' : '<br>'}`;

  return translatedValue;
};

const translateValueOfTypeArray = ({ value, blockType, isLast }) => {
  let translatedValue = '';
  const isJson = blockType === 'json';

  translatedValue += '[';
  translatedValue += isJson ? '' : '<br><div class="bcc-c-code-json-array">';
  // eslint-disable-next-line no-use-before-define
  translatedValue += value.map((val, index) => translateKeyValueToBlockType({
    key: index,
    value: val,
    isLast: index + 1 === Object.keys(value).length,
    showKey: false,
    blockType,
  })).join('');
  translatedValue += isJson ? '' : '</div>';
  translatedValue += ']';
  translatedValue += isLast ? ' ' : ',';
  translatedValue += isJson ? '' : '<br>';

  return translatedValue;
};

const translateValueOfTypeObject = ({ value, blockType, isLast }) => {
  let translatedValue = '';
  const isJson = blockType === 'json';

  translatedValue += '{';
  translatedValue += isJson ? '' : '<br><div class="bcc-c-code-json-object">';
  // eslint-disable-next-line no-use-before-define
  translatedValue += Object.entries(value).map(([k, v], index) => translateKeyValueToBlockType({
    key: k,
    value: v,
    isLast: index + 1 === Object.keys(value).length,
    blockType,
  })).join('');
  translatedValue += isJson ? '' : '</div>';
  translatedValue += '}';
  translatedValue += isLast ? ' ' : ',';
  translatedValue += isJson ? '' : '<br>';

  return translatedValue;
};

const translateValue = ({ value, blockType, isLast }) => {
  let translatedValue = '';

  if (typeof value === 'string') {
    translatedValue += translateValueOfTypeString({ value, blockType, isLast });
  } else if (Array.isArray(value)) {
    translatedValue += translateValueOfTypeArray({ value, blockType, isLast });
  } else {
    translatedValue += translateValueOfTypeObject({ value, blockType, isLast });
  }

  return translatedValue;
};

const translateKeyValueToBlockType = ({
  key,
  value,
  isLast,
  showKey = true,
  blockType,
}) => {
  let translatedValue = '';

  translatedValue += translateKey({ key, blockType, showKey });
  translatedValue += translateValue({ value, blockType, isLast });

  if (blockType === 'html') {
    return `<div class="bcc-c-code-nested">${translatedValue}</div>`;
  }
  return translatedValue;
};

const generateBlock = (params, blockType) => (
  Object.entries(params).map(([key, value], index) => translateKeyValueToBlockType({
    key,
    value,
    isLast: index + 1 === Object.keys(params).length,
    blockType,
  })).join('')
);

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

  const editorBlock = generateBlock(paramsToUse, 'html');
  const renderedBlock = generateBlock(paramsToUse, 'json');

  const importCode = `{% <span class="bcc-u-code-primary-color">from</span> <span class="bcc-u-code-secondary-color">'${type}s/${name}/macro.njk'</span> <span class="bcc-u-code-primary-color">import</span> ${componentName} %}`;

  const renderedComponentCode = `${importCode}<br><br> {{ ${componentName}({<div id="json-params" class="bcc-c-code-json-block">${editorBlock}</div>}) }}`;
  const renderedComponentDisplay = `{{ ${componentName}({${renderedBlock}}) }}`;

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
