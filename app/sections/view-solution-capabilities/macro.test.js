import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-solution-capabilities/macro.njk' import viewSolutionCapabilities %}
                        {{ viewSolutionCapabilities(params) }}`;

describe('view-solution-capabilities', () => {
  it('should render the title of the section', (done) => {
    const context = {
      params: {
        section: {},
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('h3').text().trim()).toEqual('Capabilities met');
        done();
      });
  });

  it('should not render the solution capabilities section when not provided', (done) => {
    const context = {
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-solution-capabilities"]').length).toEqual(0);
        done();
      });
  });

  it('should render the bullet list for each capability', (done) => {
    const capabilitiesMet = ['capability 1', 'capability 2', 'capability 3'];
    const context = {
      params: {
        section: {
          answers: {
            'capabilities-met': capabilitiesMet,
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const capabilitiesMetList = $('[data-test-id="view-question-data-bulletlist"] li');

        expect(capabilitiesMetList.length).toEqual(3);
        done();
      });
  });
});
