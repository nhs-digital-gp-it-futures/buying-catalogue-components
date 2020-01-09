import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-solution-description/macro.njk' import viewSolutionDescription %}
                        {{ viewSolutionDescription(params) }}`;

describe('view-solution-description', () => {
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

        expect($('h3').text().trim()).toEqual('Solution description');

        done();
      });
  });

  it('should not render the solution-description section when not provided', (done) => {
    const context = {
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-solution-description"]').length).toEqual(0);

        done();
      });
  });

  describe('when there are answers provided for the questions', () => {
    it('should render the summary question title and data', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              summary: 'Some summary data',
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const summaryQuestion = $('[data-test-id="view-section-question-summary"]');

          expect(summaryQuestion.find('[data-test-id="view-question-data-title"]').text().trim()).toEqual('Summary');
          expect(summaryQuestion.find('[data-test-id="view-question-data-text-summary"]').text().trim()).toEqual('Some summary data');

          done();
        });
    });

    it('should render the description question title and data', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              description: 'Some description data',
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

          expect(descriptionQuestion.find('[data-test-id="view-question-data-title"]').text().trim()).toEqual('About the solution');
          expect(descriptionQuestion.find('[data-test-id="view-question-data-text-description"]').text().trim()).toEqual('Some description data');

          done();
        });
    });

    it('should only render the link question as a link component', (done) => {
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

          expect(linkQuestion.find('[data-test-id="view-question-data-title"]').length).toEqual(0);
          expect(linkQuestion.find('[data-test-id="view-question-data-link"]').text().trim()).toEqual('www.somelink.com');

          done();
        });
    });
  });

  describe('when there are no answers provided for the questions', () => {
    it('should not render the summary question title and data', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              summary: '',
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const summaryQuestion = $('[data-test-id="view-section-question-summary"]');

          expect(summaryQuestion.length).toEqual(0);

          done();
        });
    });

    it('should not render the description question title and data', (done) => {
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
