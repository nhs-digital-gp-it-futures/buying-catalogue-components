import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-features/macro.njk' import viewFeatures %}
                        {{ viewFeatures(params) }}`;


describe('view-features', () => {
  it('should render the title of the features section', (done) => {
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

        expect($('h3').text().trim()).toEqual('Features');

        done();
      });
  });

  it('should not render the features section when not provided', (done) => {
    const context = {
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-features"]').length).toEqual(0);

        done();
      });
  });

  describe('when there are answers provided for the questions', () => {
    it('should render the listings', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              listing: [
                'Some first data',
                'Some second data',
                'Some third data',
              ],
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const listingsQuestion = $('[data-test-id="view-section-question-listing"]');
          expect(listingsQuestion.find('[data-test-id="view-question-data-bulletlist"]').length).toEqual(1);

          done();
        });
    });
  });

  describe('when there are no answers provided for the questions', () => {
    it('should not render the listings', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              listing: [],
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const listingsQuestion = $('[data-test-id="view-section-question-listing"]');
          expect(listingsQuestion.length).toEqual(0);

          done();
        });
    });
  });
});
