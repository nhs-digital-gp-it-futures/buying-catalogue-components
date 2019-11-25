import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-section-heading/macro.njk' import viewSectionHeading %}
                        {{ viewSectionHeading(params) }}`;

describe('view-section-heading', () => {
  it('should render view-section-heading component', (done) => {
    const context = {};

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div').hasClass('bc-c-title-block')).toEqual(true);
        done();
      });
  });

  it('should render the view-section-heading with the correct text', (done) => {
    const context = {
      params: {
        text: 'Some section heading text',
      },
    };
    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('h3').text().trim()).toEqual('Some section heading text');
        done();
      });
  });
});
