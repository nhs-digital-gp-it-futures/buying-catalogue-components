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
        const sectionTableRow = $('div[data-test-id="view-section-table-row-some-question-id"]');

        expect(sectionTableRow.find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Some question title');

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
        const sectionTableRow = $('div[data-test-id="view-section-table-row-some-question-id"]');

        expect(sectionTableRow.find('div[data-test-id="view-section-table-row-component"] p').text().trim()).toEqual('Some inner component');

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

  it('should render a horizontal row if layout is not provided', (done) => {
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

        expect($('[data-test-id="view-section-table-row-horizontal"]').length).toEqual(1);

        done();
      });
  });

  it('should render a horizontal row if layout is set to "horizontal"', (done) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        layout: 'horizontal',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-section-table-row-horizontal"]').length).toEqual(1);

        done();
      });
  });

  it('should render a vertical row if layout is set to "vertical"', (done) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        layout: 'vertical',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-section-table-row-vertical"]').length).toEqual(1);

        done();
      });
  });

  it('should render a vertical row if layout is set to "VERTICAL"', (done) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        layout: 'VERTICAL',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-section-table-row-vertical"]').length).toEqual(1);

        done();
      });
  });

  it('should not render component if layout is set to "unknown"', (done) => {
    const context = {
      params: {
        questionId: 'some-question-id',
        layout: 'unknown',
        innerComponent: '<p>Some inner component</p>',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id^="view-section-table-row"]').length).toEqual(0);

        done();
      });
  });
});
