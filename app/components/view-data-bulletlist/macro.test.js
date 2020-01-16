import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-data-bulletlist/macro.njk' import viewDataBulletlist %}
                        {{ viewDataBulletlist(params) }}`;

describe('view-data-bulletlist', () => {
  it('should render the data as a list when provided', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          'Some first data',
          'Some second data',
          'Some third data',
        ],
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="some-data-identifier"] ul').length).toEqual(1);
        expect($('[data-test-id="some-data-identifier"] li').length).toEqual(3);

        done();
      });
  });

  it('should not render the data when not provided', (done) => {
    const context = {};

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="some-data-identifier"]').length).toEqual(0);

        done();
      });
  });

  it('should not render empty strings when provided', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          'Some first data',
          '',
          'Some second data',
          '',
          'Some third data',
          '',
        ],
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="some-data-identifier"] ul').length).toEqual(1);
        expect($('[data-test-id="some-data-identifier"] li').length).toEqual(3);

        done();
      });
  });

  it('should not render strings that contain only spaces when provided', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          'Some first data',
          '   ',
          'Some second data',
          ' ',
          'Some third data',
          '       ',
        ],
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="some-data-identifier"] ul').length).toEqual(1);
        expect($('[data-test-id="some-data-identifier"] li').length).toEqual(3);

        done();
      });
  });

  it('should add classes provided within the params', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [],
        classes: 'new-class another-class',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('bc-c-data-bulletlist')).toEqual(true);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('new-class')).toEqual(true);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('another-class')).toEqual(true);

        done();
      });
  });
});
