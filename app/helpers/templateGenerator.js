const fs = require('fs');

const stringConstructor = 'test'.constructor;
const arrayConstructor = [].constructor;
const objectConstructor = ({}).constructor;

const objectSize = (object) => {
  let size = 0;
  Object.keys(object).forEach(() => {
    size += 1;
  });
  return size;
};

const whatIsIt = (object) => {
  if (object === null) {
    return 'null';
  }
  if (object === undefined) {
    return 'undefined';
  }
  if (object.constructor === stringConstructor) {
    return 'String';
  }
  if (object.constructor === arrayConstructor) {
    return 'Array';
  }
  if (object.constructor === objectConstructor) {
    return 'Object';
  }
  return 'unknown';
};

const generateEditableJSON = ([key, value, isLast = '', showKey = true], isCode = false) => {
  const newValue = typeof value === 'string' ? value.replace(/&lt/g, '<').replace(/&gt;/g, '>') : value;

  const isString = whatIsIt(newValue) === 'String';
  const isObject = whatIsIt(newValue) === 'Object';
  const isArray = whatIsIt(newValue) === 'Array';

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

  const opts = options[isCode ? 'display' : 'code'];

  let html = isCode ? '' : '<div class="nested-code">';

  if (showKey) {
    html += isCode ? '' : '<label for="param">';
    html += '"';
    html += key;
    html += '": ';
    html += isCode ? '' : '</label>';
  }

  if (isString) {
    html += isCode ? '' : '<span  class="json-text-input">';
    html += '"';
    html += isCode ? '' : '<span contenteditable="true">';
    html += newValue.replace(opts.regex1, opts.string1).replace(opts.regex2, opts.string2);
    html += isCode ? '' : '</span>';
    html += '"';
    html += isCode ? '' : '</span>';
    html += isLast ? ' ' : ',';
    html += isCode ? '' : '<br>';
  }

  if (isObject) {
    html += '{';
    html += isCode ? '' : '<br><div class="json-object">';
    html += Object.entries(newValue).map(([k, v], index) => generateEditableJSON([k, v, index + 1 === objectSize(newValue)], isCode)).join('');
    html += isCode ? '' : '</div>';
    html += '}';
    html += isLast ? ' ' : ',';
    html += isCode ? '' : '<br>';
  }

  if (isArray) {
    html += '[';
    html += isCode ? '' : '<br><div class="json-array">';
    html += newValue.map((val, index) => generateEditableJSON([index || '0', val, index + 1 === objectSize(newValue), false], isCode)).join('');
    html += isCode ? '' : '</div>';
    html += ']';
    html += isLast ? ' ' : ',';
    html += isCode ? '' : '<br>';
  }

  html += isCode ? '' : '</div>';

  return html;
};

const generateEditableCode = (params, isCode = false) => {
  if (whatIsIt(params) === 'Array') {
    return `[${params.map((val, index) => generateEditableJSON([index || '0', val, index + 1 === objectSize(params), false], isCode)).join('')}]`;
  }
  return `{${Object.entries(params).map((val, index) => generateEditableJSON([...val, index + 1 === objectSize(params)], isCode)).join('')}}`;
};

/**
 * Get the settings.json from the component/section directory.
 * @param name
 * @param type
 * @returns {any}
 */
const getSettings = (name, type) => {
  const settingsString = fs.readFileSync(`app/${type}s/${name}/settings.json`, 'utf-8');
  return JSON.parse(settingsString);
};

/**
 * Write template to directory.
 * @param template
 * @param name
 * @param type
 */
const writeTemplate = (template, name, type) => {
  const dir = `app/templates/${type}s`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(`${dir}/${name}-template.njk`, template);
};

const generateTemplate = ({
  name,
  formParams = {},
}, type) => {
  const settings = getSettings(name, type);
  const { componentName } = settings;
  const formParamsExist = Object.keys(formParams).length > 0;

  const params = formParamsExist ? formParams : settings.params;

  const codeBlock = generateEditableCode(params);
  const displayBlock = generateEditableCode(params, true);

  const importCode = `{% <span class="code-primary">from</span> <span class="code-secondary">'${type}s/${name}/macro.njk'</span> <span class="code-primary">import</span> ${componentName} %}`;

  const renderedComponentCode = `${importCode}<br><br> {{ ${componentName}(<div id="json-params" class="json-block">${codeBlock}</div>) }}`;
  const renderedComponentDisplay = `{{ ${componentName}(${displayBlock}) }}`;

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
