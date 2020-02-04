import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-roadmap/macro.njk' import viewRoadmap %}
                        {{ viewRoadmap(params) }}`;

describe('view-roadmap', () => {
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

        expect($('h3').text().trim()).toEqual('Roadmap');

        done();
      });
  });

  it('should not render the roadmap section when not provided', (done) => {
    const context = {};

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-roadmap"]').length).toEqual(0);

        done();
      });
  });

  it('should render the guidance text if the section is provided', (done) => {
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

        const roadmapGuidance = $('[data-test-id="view-roadmap-guidance"]');
        expect(roadmapGuidance.text().trim()).toEqual('We plan to deliver a task management function by Autumn 2019. We are also going to achieve the updated Document Management Standard ahead of schedule in August 2019.');
        expect(roadmapGuidance.hasClass('nhsuk-u-font-weight-bold')).toEqual(true);
        done();
      });
  });

  describe('when there are answers provided for the questions', () => {
    it('should render the summary data', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              summary: 'Some roadmap summary data',
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

          expect(summaryQuestion.find('[data-test-id="view-question-title"]').length).toEqual(0);
          expect(summaryQuestion.find('[data-test-id="view-question-data-text-summary"]').text().trim()).toEqual('Some roadmap summary data');

          done();
        });
    });

    it('should render the document link', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              'document-link': '/solution/10001/document/roadmap.pdf',
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const documentLinkQuestion = $('[data-test-id="view-section-question-document-link"]');

          expect(documentLinkQuestion.find('[data-test-id="view-question-data-link-document-link"]').text().trim()).toEqual('View roadmap');
          expect(documentLinkQuestion.find('[data-test-id="view-question-data-link-document-link"] a').attr('href')).toEqual('/solution/10001/document/roadmap.pdf');

          done();
        });
    });
  });

  describe('when there are no answers provided for the questions', () => {
    it('should not render the summary data', (done) => {
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

    it('should not render the document link', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              'document-link': '',
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);

          const documentLinkQuestion = $('[data-test-id="view-section-question-document-link"]');

          expect(documentLinkQuestion.length).toEqual(0);

          done();
        });
    });
  });
});
