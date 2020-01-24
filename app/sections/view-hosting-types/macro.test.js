import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-hosting-types/macro.njk' import viewHostingTypes %}
                        {{ viewHostingTypes(params) }}`;

describe('view-hosting-types', () => {
  it('should render the title of the section if the public cloud section is provided', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'hosting-type-public-cloud': {},
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('h3').text().trim()).toEqual('Hosting type');

        done();
      });
  });

  it('should render the title of the section if the private section is provided', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'hosting-type-private-cloud': {},
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('h3').text().trim()).toEqual('Hosting type');

        done();
      });
  });

  it('should render the title of the section if the hybrid section is provided', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'hosting-type-hybrid': {},
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('h3').text().trim()).toEqual('Hosting type');

        done();
      });
  });

  it('should render the title of the section if the on-premise section is provided', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'hosting-type-on-premise': {},
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('h3').text().trim()).toEqual('Hosting type');

        done();
      });
  });

  it('should not render the hosting-types section when none of the hosting sections are provided', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'some-other-section': {},
          },
        },
      },
    };

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-hosting-types"]').length).toEqual(0);

        done();
      });
  });

  describe('when a sub section exists for a hosting type', () => {
    it('should render the public cloud hosting type', (done) => {
      const context = {
        params: {
          section: {
            sections: {
              'hosting-type-public-cloud': {},
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);


          const publicCloudExpandableSection = $('[data-test-id="view-section-hosting-type-public-cloud"]');
          const publicCloudSection = publicCloudExpandableSection.find('[data-test-id="view-section-table-hosting-type-public-cloud"]');

          expect(publicCloudExpandableSection.length).toEqual(1);
          expect(publicCloudSection.length).toEqual(1);

          done();
        });
    });

    it('should render the private cloud hosting type', (done) => {
      const context = {
        params: {
          section: {
            sections: {
              'hosting-type-private-cloud': {},
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);


          const privateCloudExpandableSection = $('[data-test-id="view-section-hosting-type-private-cloud"]');
          const privateCloudSection = privateCloudExpandableSection.find('[data-test-id="view-section-table-hosting-type-private-cloud"]');

          expect(privateCloudExpandableSection.length).toEqual(1);
          expect(privateCloudSection.length).toEqual(1);

          done();
        });
    });

    it('should render the hybrid hosting type', (done) => {
      const context = {
        params: {
          section: {
            sections: {
              'hosting-type-hybrid': {},
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);


          const hybridExpandableSection = $('[data-test-id="view-section-hosting-type-hybrid"]');
          const hybridSection = hybridExpandableSection.find('[data-test-id="view-section-table-hosting-type-hybrid"]');

          expect(hybridExpandableSection.length).toEqual(1);
          expect(hybridSection.length).toEqual(1);

          done();
        });
    });

    it('should render the on premise hosting type', (done) => {
      const context = {
        params: {
          section: {
            sections: {
              'hosting-type-on-premise': {},
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);


          const onPremiseExpandableSection = $('[data-test-id="view-section-hosting-type-on-premise"]');
          const onPremiseSection = onPremiseExpandableSection.find('[data-test-id="view-section-table-hosting-type-on-premise"]');

          expect(onPremiseExpandableSection.length).toEqual(1);
          expect(onPremiseSection.length).toEqual(1);

          done();
        });
    });
  });

  describe('when a sub section does not exist for a hosting type', () => {
    it('should not render the public cloud hosting type', (done) => {
      const context = {
        params: {
          section: {
            sections: {
              'some-other-section': {
                answers: {
                  'some-question': 'Some data',
                },
              },
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          const publicCloudExpandableSection = $('[data-test-id="view-section-hosting-type-public-cloud"]');

          expect(publicCloudExpandableSection.length).toEqual(0);

          done();
        });
    });

    it('should not render the private cloud hosting type', (done) => {
      const context = {
        params: {
          section: {
            sections: {
              'some-other-section': {
                answers: {
                  'some-question': 'Some data',
                },
              },
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          const privateCloudExpandableSection = $('[data-test-id="view-section-hosting-type-private-cloud"]');

          expect(privateCloudExpandableSection.length).toEqual(0);

          done();
        });
    });

    it('should not render the hybrid hosting type', (done) => {
      const context = {
        params: {
          section: {
            sections: {
              'some-other-section': {
                answers: {
                  'some-question': 'Some data',
                },
              },
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          const hybridExpandableSection = $('[data-test-id="view-section-hosting-type-hybrid"]');

          expect(hybridExpandableSection.length).toEqual(0);

          done();
        });
    });

    it('should not render the on premise hosting type', (done) => {
      const context = {
        params: {
          section: {
            sections: {
              'some-other-section': {
                answers: {
                  'some-question': 'Some data',
                },
              },
            },
          },
        },
      };

      const dummyApp = createTestHarness(macroWrapper, context);
      request(dummyApp)
        .get('/')
        .then((res) => {
          const $ = cheerio.load(res.text);
          const onPremiseExpandableSection = $('[data-test-id="view-section-hosting-type-on-premise"]');

          expect(onPremiseExpandableSection.length).toEqual(0);

          done();
        });
    });
  });
});
