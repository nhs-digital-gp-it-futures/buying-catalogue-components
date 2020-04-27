import nunjucks from 'nunjucks';
import { createTestHarness } from 'buying-catalogue-library';
import { App } from '../app';
import config from '../config';


// const macroWrapper = `{% from './${setup.templateType}s/${setup.componentType ? `${setup.componentType}/components/` : ''}${setup.templateName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()}/macro.njk' import ${setup.templateName} %} {{ ${setup.templateName}(params) }}`;

export const componentTester = (setup, callback) => (done) => {
  const app = new App().createApp();

  callback(createTestHarness({
    app,
    templateEngine: nunjucks,
    config,
    setup,
    done,
  }));
};
