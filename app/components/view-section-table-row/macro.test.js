import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-section-table-row/macro.njk' import viewSectionTableRow %}
                        {{ viewSectionTableRow(params) }}`;


describe('view-section-table-row', () => {
  it('should render title of the row', (done) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        questionTitle: 'Some question title',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('dt').text().trim()).toEqual('Some question title');

        done();
      });
  });

  it('should render innerComponent of the value of the row as an inner component', (done) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('dd p').text().trim()).toEqual('Some inner component');

        done();
      });
  });

  it('should not render the row if inner component is not provided', (done) => {
    const context = {
      params: {
        questionId: 'some-question-id',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-section-table-row-some-question-id"]').length).toEqual(0);

        done();
      });
  });
});
