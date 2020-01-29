import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-capabilities/macro.njk' import viewCapabilities %}
                        {{ viewCapabilities(params) }}`;

describe('view-capabilities', () => {
  it('should render the title of the section', (done) => {
    const context = {
      params: {},
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

  it('should render the capability expandable sections if data provided', (done) => {
    const context = {
      params: {
        capabilities: [
          {
            name: 'Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
          },
          {
            name: 'Social Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
          },
        ],
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const viewCapabilities = $('[data-test-id="view-capabilities"]');
        const viewSectionCapabilities = viewCapabilities.find('[data-test-id="view-section-capabilities"]');

        expect(viewSectionCapabilities.length).toEqual(2);

        done();
      });
  });

  it('should not render the capability expandable sections if data not provided', (done) => {
    const context = {};

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const viewCapabilities = $('[data-test-id="view-capabilities"]');
        const viewSectionCapabilities = viewCapabilities.find('[data-test-id="view-section-capabilities"]');

        expect(viewSectionCapabilities.length).toEqual(0);

        done();
      });
  });

  it('should render the name and version of the expandable section', (done) => {
    const context = {
      params: {
        capabilities: [
          {
            name: 'Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
          },
        ],
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-section-capabilities"] .nhsuk-details__summary-text').text().trim()).toEqual('Prescribing, 1.0');

        done();
      });
  });

  it('should render the capability description', (done) => {
    const context = {
      params: {
        capabilities: [
          {
            name: 'Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
          },
        ],
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const viewCapabilities = $('[data-test-id="view-capabilities"]');
        const viewSectionCapabilities = viewCapabilities.find('[data-test-id="view-section-capabilities"]');
        const viewCapabilitiesDescription = viewSectionCapabilities.find('[data-test-id="view-question-data-text-description"]');

        expect(viewCapabilitiesDescription.text().trim()).toEqual('Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.');

        done();
      });
  });

  it('should render the capability link', (done) => {
    const context = {
      params: {
        capabilities: [
          {
            name: 'Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
          },
        ],
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const viewCapabilities = $('[data-test-id="view-capabilities"]');
        const viewSectionCapabilities = viewCapabilities.find('[data-test-id="view-section-capabilities"]');
        const viewCapabilitiesLink = viewSectionCapabilities.find('[data-test-id="view-question-data-text-link"] a');

        expect(viewCapabilitiesLink.length).toEqual(1);
        expect(viewCapabilitiesLink.attr('href')).toEqual('http://www.some-prescribing-link.com');

        done();
      });
  });

  it('should render the capability epic', (done) => {
    const context = {
      params: {
        capabilities: [
          {
            name: 'Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
            epic: [
              {
                may: {
                  met: [
                    {
                      id: 'C14E13',
                      name: 'access Patient Record',
                    },
                    {
                      id: 'C14E14',
                      name: 'search the directory',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const viewCapabilities = $('[data-test-id="view-capabilities"]');
        const viewSectionCapabilities = viewCapabilities.find('[data-test-id="view-section-capabilities"]');
        const viewCapabilitiesEpic = viewSectionCapabilities.find('[data-test-id="view-question-epic"]');

        expect(viewCapabilitiesEpic.length).toEqual(1);

        done();
      });
  });

});
