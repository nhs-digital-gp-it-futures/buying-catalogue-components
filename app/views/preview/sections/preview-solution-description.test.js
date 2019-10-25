import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './preview/sections/preview-solution-description.njk' import previewSolutionDescription %}
                            {{ previewSolutionDescription(section) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};

describe('preview-solution-description', () => {
  it('should render the title of the section', (done) => {
    const context = {};

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('h3').text().trim()).toEqual('Solution description');

        done();
      });
  });

  describe('when display is true for the question', () => {
    it('should render the summary question title and data', (done) => {
      const context = {
        section: {
          questions: {
            summary: {
              display: true,
              data: 'Some summary data',
            },
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const summaryQuestion = $('[data-test-id="preview-section-question-summary"]');

          expect(summaryQuestion.find('[data-test-id="preview-question-title"]').text().trim()).toEqual('Summary');
          expect(summaryQuestion.find('[data-test-id="preview-question-data-text"]').text().trim()).toEqual('Some summary data');

          done();
        });
    });

    it('should render the description question title and data', (done) => {
      const context = {
        section: {
          questions: {
            description: {
              display: true,
              data: 'Some description data',
            },
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const descriptionQuestion = $('[data-test-id="preview-section-question-description"]');

          expect(descriptionQuestion.find('[data-test-id="preview-question-title"]').text().trim()).toEqual('Description');
          expect(descriptionQuestion.find('[data-test-id="preview-question-data-text"]').text().trim()).toEqual('Some description data');

          done();
        });
    });

    it('should only render the link question as a link component', (done) => {
      const context = {
        section: {
          questions: {
            link: {
              display: true,
              data: 'www.somelink.com',
            },
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const linkQuestion = $('[data-test-id="preview-section-question-link"]');

          expect(linkQuestion.find('[data-test-id="preview-question-title"]').length).toEqual(0);
          expect(linkQuestion.find('[data-test-id="preview-question-data-link"]').text().trim()).toEqual('www.somelink.com');

          done();
        });
    });
  });

  describe('when display is falsy for the question', () => {
    it('should render the summary question title and data', (done) => {
      const context = {
        section: {
          questions: {
            summary: {},
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const summaryQuestion = $('[data-test-id="preview-section-question-summary"]');

          expect(summaryQuestion.length).toEqual(0);

          done();
        });
    });

    it('should render the description question title and data', (done) => {
      const context = {
        section: {
          questions: {
            description: {},
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const descriptionQuestion = $('[data-test-id="preview-section-question-description"]');

          expect(descriptionQuestion.length).toEqual(0);

          done();
        });
    });

    it('should only render the link question as a link component', (done) => {
      const context = {
        section: {
          questions: {
            link: {},
          },
        },
      };

      const dummyApp = createDummyApp(context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const linkQuestion = $('[data-test-id="preview-section-question-link"]');

          expect(linkQuestion.length).toEqual(0);

          done();
        });
    });
  });
});
