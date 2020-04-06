/* eslint-disable no-use-before-define */
const fs = require('fs');

const determineIsLast = ({ index, value }) => index + 1 === Object.keys(value).length;

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

const translateValueOfTypeString = ({ value, blockType }) => {
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
  const translation = `${value.replace(translator.lessThanRegex, translator.lessThanString).replace(translator.greaterThanRegex, translator.greaterThanString)}`;

  let translatedValue = '';
  if (blockType === 'html') {
    translatedValue += `<span class="bcc-c-code-editable-content bcc-u-code-primary-color">"<span contenteditable="true">${translation}</span>"</span>`;
  } else {
    translatedValue += `"${translation}"`;
  }

  return translatedValue;
};

const translateValueOfTypeArray = ({ value, blockType }) => {
  let translatedValue = '';

  const innerTranslatedValue = value.map((val, index) => translateKeyValue({
    key: index,
    value: val,
    isLast: determineIsLast({ index, value }),
    showKey: false,
    blockType,
  })).join('');

  translatedValue += '[';
  if (blockType === 'html') {
    translatedValue += `<div class="bcc-c-code-json-array">${innerTranslatedValue}</div>`;
  } else {
    translatedValue += innerTranslatedValue;
  }
  translatedValue += ']';

  return translatedValue;
};

const translateValueOfTypeObject = ({ value, blockType }) => {
  let translatedValue = '';

  const innerTranslatedValue = Object.entries(value)
    .map(([innerKey, innerValue], index) => translateKeyValue({
      key: innerKey,
      value: innerValue,
      isLast: determineIsLast({ index, value }),
      blockType,
    })).join('');

  translatedValue += '{';
  if (blockType === 'html') {
    translatedValue += `<div class="bcc-c-code-json-object">${innerTranslatedValue}</div>`;
  } else {
    translatedValue += innerTranslatedValue;
  }
  translatedValue += '}';

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
  translatedValue += isLast ? ' ' : ',';

  return translatedValue;
};

const translateKeyValue = ({
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
  Object.entries(params).map(([key, value], index) => translateKeyValue({
    key,
    value,
    isLast: determineIsLast({ index, value: params }),
    blockType,
  })).join('')
);

const getSettings = ({ name, templateType, componentType }) => {
  const settingsString = fs.readFileSync(
    `app/${templateType}s/${componentType ? `${componentType}/` : ''}${name}/settings.json`,
    'utf-8',
  );
  return JSON.parse(settingsString);
};

const writeTemplate = ({
  template, name, templateType, componentType,
}) => {
  const directory = 'app/templates';
  const templateDirectory = `${directory}/${templateType}s`;
  const componentDirectory = `${templateDirectory}${componentType ? `/${componentType}/` : ''}`;
  if (!fs.existsSync(directory)) fs.mkdirSync(directory);
  if (!fs.existsSync(templateDirectory)) fs.mkdirSync(templateDirectory);
  if (!fs.existsSync(componentDirectory)) fs.mkdirSync(componentDirectory);
  fs.writeFileSync(`${componentDirectory}/${name}-template.njk`, template);
};

const generateEditorBlock = ({
  name,
  templateType,
  componentName,
  paramsToUse,
  componentType,
}) => {
  const editorBlock = generateBlock(paramsToUse, 'html');
  const importCode = `{% <span class="bcc-u-code-primary-color">from</span> <span class="bcc-u-code-secondary-color">'${templateType}s/${componentType ? `${componentType}/` : ''}${name}/macro.njk'</span> <span class="bcc-u-code-primary-color">import</span> ${componentName} %}`;
  return `${importCode}<br><br> {{ ${componentName}({<div id="json-params" class="bcc-c-code-json-block">${editorBlock}</div>}) }}`;
};

const generateRenderedBlock = ({
  componentName,
  paramsToUse,
}) => {
  const renderedBlock = generateBlock(paramsToUse, 'json');
  return `{{ ${componentName}({${renderedBlock}}) }}`;
};

const generateTemplate = ({
  name,
  formParams = {},
  templateType,
  componentType,
}) => {
  const {
    componentName, params: paramsFromSettings,
  } = getSettings({ name, templateType, componentType });
  const paramsToUse = Object.keys(formParams).length > 0 ? formParams : paramsFromSettings;

  const editorBlock = generateEditorBlock({
    name, templateType, componentName, paramsToUse, componentType,
  });
  const renderedSection = generateRenderedBlock({ componentName, paramsToUse });

  writeTemplate({
    template: `
      {% extends 'views/includes/layout.njk' %}
      {% from 'components/back-link/macro.njk' import backLink %}
      {% from '${templateType}s/${componentType ? `${componentType}/` : ''}${name}/macro.njk' import ${componentName} %}

      {% block body %}
        {{ backLink({
          "href": "/${templateType}s${componentType ? `/${componentType}` : ''}",
          "text": "Return to ${componentType ? `${componentType} ` : ''}${templateType}s"
        }) }}

      <h1>${componentName} ${templateType}</h1>

      <div>
        <form method="post" action="/${templateType}/${componentType ? `${componentType}/` : ''}${name}" id="try-params" class="nhsuk-u-clear">
          <h3 class="bcc-c-code-title">To use the ${templateType} <button type="submit" form="try-params" class="nhsuk-u-font-size-16 bcc-c-try-button">Try it out</button></h3>
          <div class="bcc-c-code-block">
            {% verbatim %}
                ${editorBlock}
            {% endverbatim %}
          </div>
        </form>
      </div>

      <div id="display-block">
        <h3 class="bcc-c-display-title">Rendered ${templateType}</h3>
        <div class="bcc-c-display-block">
          ${renderedSection}
        </div>
      </div>
      {% endblock %}
    `,
    name,
    templateType,
    componentType,
  });
};

module.exports = {
  generateTemplate,
};
