import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-epic-list/macro.njk' import viewEpicList %}
                        {{ viewEpicList(params) }}`;

describe('view-epic-list', () => {
  it('should render the met data when provided', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          {
            id: 'C14E1',
            name: 'access prescribable items',
          },
          {
            id: 'C14E2',
            name: 'manage Formularies',
          },
          {
            id: 'C14E13',
            name: 'access Patient Record',
          },
        ],
        type: 'met',
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

  it('should not render the met data when not provided', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [],
        type: 'met',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="some-data-identifier"]').length).toEqual(0);

        done();
      });
  });

  it('should render the not-met data when provided', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          {
            id: 'C14E1',
            name: 'access prescribable items',
          },
          {
            id: 'C14E2',
            name: 'manage Formularies',
          },
          {
            id: 'C14E13',
            name: 'access Patient Record',
          },
        ],
        type: 'not-met',
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

  it('should not render the not-met data when not provided', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [],
        type: 'not-met',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="some-data-identifier"]').length).toEqual(0);

        done();
      });
  });

  it('should not render the data when no type provided', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          {
            id: 'C14E1',
            name: 'access prescribable items',
          },
          {
            id: 'C14E2',
            name: 'manage Formularies',
          },
          {
            id: 'C14E13',
            name: 'access Patient Record',
          },
        ],
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="some-data-identifier"]').length).toEqual(0);

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

  it('should render the epic id', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          {
            id: 'C14E1',
            name: 'access prescribable items',
          },
        ],
        type: 'met',
      },
    };


    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="some-data-identifier"] ul li span').text().trim()).toEqual('(C14E1)');

        done();
      });
  });

  it('should render the tick icon for met types', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          {
            id: 'C14E1',
            name: 'access prescribable items',
          },
        ],
        type: 'met',
      },
    };


    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="some-data-identifier"] ul li svg').hasClass('nhsuk-icon')).toEqual(true);
        expect($('[data-test-id="some-data-identifier"] ul li svg').hasClass('nhsuk-icon__tick')).toEqual(true);
        done();
      });
  });

  it('should render the cross icon for not-met types', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          {
            id: 'C14E1',
            name: 'access prescribable items',
          },
        ],
        type: 'not-met',
      },
    };


    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="some-data-identifier"] ul li svg').hasClass('nhsuk-icon')).toEqual(true);
        expect($('[data-test-id="some-data-identifier"] ul li svg').hasClass('nhsuk-icon__cross')).toEqual(true);
        done();
      });
  });

  it('should add classes provided within the params', (done) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          {
            id: 'C14E1',
            name: 'access prescribable items',
          },
        ],
        type: 'met',
        classes: 'new-class another-class',
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('bc-c-epic-list')).toEqual(true);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('new-class')).toEqual(true);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('another-class')).toEqual(true);

        done();
      });
  });
});
