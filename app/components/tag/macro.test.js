import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/tag/macro.njk' import tag %}
                        {{ tag(params) }}`;

describe('tag', () => {
  it('should render the tag with the correct data-test-id', (done) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-tag',
      },
    };
    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div[data-test-id="qa-identifier-tag"]').length).toEqual(1);
        done();
      });
  });

  it('should render the tag with the correct text', (done) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-tag',
        text: 'some tag text',
      },
    };
    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div[data-test-id="qa-identifier-tag"]').text().trim()).toEqual('some tag text');
        done();
      });
  });

  it('should render the tag with the correct classes', (done) => {
    const context = {
      params: {
        dataTestId: 'qa-identifier-tag',
        text: 'some tag text',
        classes: 'extra-class',
      },
    };
    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div[data-test-id="qa-identifier-tag"]').hasClass('bc-c-tag')).toEqual(true);
        expect($('div[data-test-id="qa-identifier-tag"]').hasClass('extra-class')).toEqual(true);
        done();
      });
  });
});
