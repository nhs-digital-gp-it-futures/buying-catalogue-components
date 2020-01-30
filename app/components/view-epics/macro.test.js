import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './components/view-epics/macro.njk' import viewEpics %}
                        {{ viewEpics(params) }}`;

describe('view-epics', () => {
  describe('for must epics', () => {
    it('should render the tag if data provided', (done) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: {
            must: {
              met: [
                {
                  id: 'C14E1',
                  name: 'access prescribable items',
                },
              ],
              'not-met': [
                {
                  id: 'C14E13',
                  name: 'access Patient Record',
                },
              ],
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          expect($('[data-test-id="must-tag"]').text().trim()).toEqual('Must Epics');

          done();
        });
    });

    it('should render the data if provided', (done) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: {
            must: {
              met: [
                {
                  id: 'C14E1',
                  name: 'access prescribable items',
                },
                {
                  id: 'C14E2',
                  name: 'manage Formularies',
                },
              ],
              'not-met': [
                {
                  id: 'C14E13',
                  name: 'access Patient Record',
                },
                {
                  id: 'C14E14',
                  name: 'search the directory',
                },
              ],
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          expect($('[data-test-id="must-epics"]').length).toEqual(1);

          done();
        });
    });

    it('should not render the data if not provided', (done) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: {},
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          expect($('[data-test-id="must-epics"]').length).toEqual(0);

          done();
        });
    });

    describe('with met type', () => {
      it('should render the data if provided', (done) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              must: {
                met: [
                  {
                    id: 'C14E1',
                    name: 'access prescribable items',
                  },
                  {
                    id: 'C14E2',
                    name: 'manage Formularies',
                  },
                ],
              },
            },
          },
        };

        const dummyApp = createTestHarness(macroWrapper, context);
        request(dummyApp)
          .get('/')
          .then((res) => {
            const $ = cheerio.load(res.text);
            expect($('[data-test-id="must-met-epics"]').length).toEqual(1);

            done();
          });
      });

      it('should not render the data if not provided', (done) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              must: {},
            },
          },
        };

        const dummyApp = createTestHarness(macroWrapper, context);
        request(dummyApp)
          .get('/')
          .then((res) => {
            const $ = cheerio.load(res.text);
            expect($('[data-test-id="some-data-identifier"] .must-met-epics').length).toEqual(0);

            done();
          });
      });
    });

    describe('with not-met type', () => {
      it('should render the data if provided', (done) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              must: {
                'not-met': [
                  {
                    id: 'C14E1',
                    name: 'access prescribable items',
                  },
                  {
                    id: 'C14E2',
                    name: 'manage Formularies',
                  },
                ],
              },
            },
          },
        };

        const dummyApp = createTestHarness(macroWrapper, context);
        request(dummyApp)
          .get('/')
          .then((res) => {
            const $ = cheerio.load(res.text);
            expect($('[data-test-id="must-not-met-epics"]').length).toEqual(1);

            done();
          });
      });

      it('should not render the data if not provided', (done) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              must: {},
            },
          },
        };

        const dummyApp = createTestHarness(macroWrapper, context);
        request(dummyApp)
          .get('/')
          .then((res) => {
            const $ = cheerio.load(res.text);
            expect($('[data-test-id="some-data-identifier"] .must-not-met-epics').length).toEqual(0);

            done();
          });
      });
    });
  });

  describe('for may epics', () => {
    it('should render the tag if data provided', (done) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: {
            may: {
              met: [
                {
                  id: 'C14E1',
                  name: 'access prescribable items',
                },
              ],
              'not-met': [
                {
                  id: 'C14E13',
                  name: 'access Patient Record',
                },
              ],
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          expect($('[data-test-id="may-tag"]').text().trim()).toEqual('May Epics');

          done();
        });
    });

    it('should render the data if provided', (done) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: {
            may: {
              met: [
                {
                  id: 'C14E15',
                  name: 'view EPS Nominated Pharmacy changes',
                },
                {
                  id: 'C14E16',
                  name: 'view EPS Nominated Pharmacy changes',
                },
              ],
              'not-met': [
                {
                  id: 'C14E17',
                  name: 'Configure warnings for prescribable items',
                },
                {
                  id: 'C14E18',
                  name: 'maintain referal record',
                },
              ],
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          expect($('[data-test-id="may-epics"]').length).toEqual(1);

          done();
        });
    });

    it('should not render the data if not provided', (done) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: {},
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          expect($('[data-test-id="may-epics"]').length).toEqual(0);

          done();
        });
    });

    describe('with met type', () => {
      it('should render the data if provided', (done) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              may: {
                met: [
                  {
                    id: 'C14E13',
                    name: 'access Patient Record',
                  },
                  {
                    id: 'C14E14',
                    name: 'search the directory',
                  },
                ],
              },
            },
          },
        };

        const dummyApp = createTestHarness(macroWrapper, context);
        request(dummyApp)
          .get('/')
          .then((res) => {
            const $ = cheerio.load(res.text);
            expect($('[data-test-id="may-met-epics"]').length).toEqual(1);

            done();
          });
      });

      it('should not render the data if not provided', (done) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              may: {},
            },
          },
        };

        const dummyApp = createTestHarness(macroWrapper, context);
        request(dummyApp)
          .get('/')
          .then((res) => {
            const $ = cheerio.load(res.text);
            expect($('[data-test-id="some-data-identifier"] .may-met-epics').length).toEqual(0);

            done();
          });
      });
    });
    describe('with not-met type', () => {
      it('should render the data if provided', (done) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              may: {
                'not-met': [
                  {
                    id: 'C14E13',
                    name: 'access Patient Record',
                  },
                  {
                    id: 'C14E14',
                    name: 'search the directory',
                  },
                ],
              },
            },
          },
        };

        const dummyApp = createTestHarness(macroWrapper, context);
        request(dummyApp)
          .get('/')
          .then((res) => {
            const $ = cheerio.load(res.text);
            expect($('[data-test-id="may-not-met-epics"]').length).toEqual(1);

            done();
          });
      });

      it('should not render the data if not provided', (done) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              may: {},
            },
          },
        };

        const dummyApp = createTestHarness(macroWrapper, context);
        request(dummyApp)
          .get('/')
          .then((res) => {
            const $ = cheerio.load(res.text);
            expect($('[data-test-id="some-data-identifier"] .may-not-met-epics').length).toEqual(0);

            done();
          });
      });
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
        expect($('div[data-test-id="some-data-identifier"]').hasClass('bc-c-epics')).toEqual(true);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('new-class')).toEqual(true);
        expect($('div[data-test-id="some-data-identifier"]').hasClass('another-class')).toEqual(true);

        done();
      });
  });
});
