import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-about-supplier/macro.njk' import viewAboutSupplier %}
                        {{ viewAboutSupplier(params) }}`;

describe('view-about-supplier', () => {
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

        expect($('h3').text().trim()).toEqual('About supplier');

        done();
      });
  });

  it('should not render the About supplier section when not provided', (done) => {
    const context = {
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-about-supplier"]').length).toEqual(0);

        done();
      });
  });

  describe('when there are answers provided for the questions', () => {
    it('should only render the description data', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              description: 'Some supplier description data',
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const descriptionQuestion = $('[data-test-id="view-section-question-description"]');

          expect(descriptionQuestion.find('[data-test-id="view-question-title"]').length).toEqual(0);
          expect(descriptionQuestion.find('[data-test-id="view-question-data-text-description"]').text().trim()).toEqual('Some supplier description data');

          done();
        });
    });

    it('should only render the link', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              link: 'www.somelink.com',
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const linkQuestion = $('[data-test-id="view-section-question-link"]');

          expect(linkQuestion.find('[data-test-id="view-question-title"]').length).toEqual(0);
          expect(linkQuestion.find('[data-test-id="view-question-data-link"]').text().trim()).toEqual('www.somelink.com');

          done();
        });
    });
  });

  describe('when there are no answers provided for the questions', () => {
    it('should not render the description data', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              description: '',
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const descriptionQuestion = $('[data-test-id="view-section-question-description"]');

          expect(descriptionQuestion.length).toEqual(0);

          done();
        });
    });

    it('should not render the solution link', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              link: '',
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const linkQuestion = $('[data-test-id="view-section-question-link"]');

          expect(linkQuestion.length).toEqual(0);

          done();
        });
    });
  });
});
