import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-data-link/macro.njk' import viewDataLink %}
                        {{ viewDataLink(params) }}`;


describe('view-data-link', () => {
  it('should render the link when provided', (done) => {
    const context = {
      params: {
        dataTestId: 'some-test-identifier',
        data: 'www.somelink.com',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="some-test-identifier"] a').text().trim()).toEqual('www.somelink.com');
        expect($('[data-test-id="some-test-identifier"] a').attr('href')).toEqual('www.somelink.com');

        done();
      });
  });

  it('should not render the data when not provided', (done) => {
    const context = {
      params: {
        dataTestId: 'some-test-identifier',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="some-test-identifier"]').length).toEqual(0);

        done();
      });
  });

  it('should add classes provided within the params', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: 'Some data',
        classes: 'new-class another-class',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('bc-c-data-link')).toEqual(true);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('new-class')).toEqual(true);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('another-class')).toEqual(true);

        done();
      });
  });
});
