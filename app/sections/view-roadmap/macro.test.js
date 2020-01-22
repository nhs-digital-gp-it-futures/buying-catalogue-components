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

        done();
      });
  });

  describe('when there are answers provided for the questions', () => {
    it('should render the description data', (done) => {
      const context = {
        params: {
          section: {
            answers: {
              description: 'Some roadmap description data',
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
          expect(descriptionQuestion.find('[data-test-id="view-question-data-text-description"]').text().trim()).toEqual('Some roadmap description data');

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
  });
});
