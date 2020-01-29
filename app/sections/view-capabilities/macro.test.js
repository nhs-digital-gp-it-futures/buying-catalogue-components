import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-capabilities/macro.njk' import viewCapabilities %}
                        {{ viewCapabilities(params) }}`;

describe('view-capabilities', () => {
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

  it('should render the capability expandable sections', (done) => {
    const context = {
      params: [
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

  it('should render the capability expandable sections', (done) => {
    const context = {
      params: [
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

  it('should not render capabilities description if not provided', (done) => {
    const context = {};

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-solution-capabilities"] p').length).toEqual(0);
        done();
      });
  });
});
