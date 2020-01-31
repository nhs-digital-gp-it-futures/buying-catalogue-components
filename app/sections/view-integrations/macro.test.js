import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-integrations/macro.njk' import viewIntegrations %}
                        {{ viewIntegrations(params) }}`;

describe('view-integrations', () => {
  it('should render the integrations section if section data provided', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'supplier-asserted-integrations': {},
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const integrations = $('[data-test-id="view-integrations"]');

        expect(integrations.length).toEqual(1);

        done();
      });
  });

  it('should not render the integrations section if no section data provided', (done) => {
    const context = {
      params: {},
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const integrations = $('[data-test-id="view-integrations"]');

        expect(integrations.length).toEqual(0);

        done();
      });
  });

  it('should render the title of the section if the integrations section is provided', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'supplier-asserted-integrations': {},
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('h3').text().trim()).toEqual('Integrations');

        done();
      });
  });

  it('should render the additional information of the section if the integrations section is provided', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'supplier-asserted-integrations': {},
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const integrationsSection = $('[data-test-id="view-integrations"]');
        const integrationsAdditionalInformation = integrationsSection.find('div[data-test-id="view-section-integrations-additional-information"]')

        expect(integrationsAdditionalInformation.text().trim()).toEqual('View information about the systems this Catalogue Solution integrates with to exchange data:');

        done();
      });
  });
});
