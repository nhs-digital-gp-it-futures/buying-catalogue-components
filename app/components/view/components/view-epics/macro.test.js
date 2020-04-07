import { createTestHarness } from '../../../../testUtils/testHarness';

const setup = {
  templateName: 'viewEpics',
  templateType: 'component',
  componentType: 'view',
};

describe('view-epics', () => {
  describe('for must epics', () => {
    it('should render the tag if data provided', createTestHarness(setup, (harness) => {
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

      harness.request(context, ($) => {
        expect($('[data-test-id="must-tag"]').text().trim()).toEqual('Must epics');
      });
    }));

    it('should render the data if provided', createTestHarness(setup, (harness) => {
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

      harness.request(context, ($) => {
        expect($('[data-test-id="must-epics"]').length).toEqual(1);
      });
    }));

    it('should not render the data if not provided', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: {
          },
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="must-epics"]').length).toEqual(0);
      });
    }));

    describe('with met type', () => {
      it('should render the viewEpicList component when provided with epics that are must and met', createTestHarness(setup, (harness) => {
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

        harness.request(context, ($) => {
          expect($('[data-test-id="must-met-epics"]').length).toEqual(1);
        });
      }));

      it('should not render the viewEpicList component when not provided with epics that are must and met', createTestHarness(setup, (harness) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              must: {
                met: [],
              },
            },
          },
        };

        harness.request(context, ($) => {
          expect($('[data-test-id="some-data-identifier"] .must-met-epics').length).toEqual(0);
        });
      }));
    });

    describe('with not-met type', () => {
      it('should render the viewEpicList component when provided with epics that are must and not-met', createTestHarness(setup, (harness) => {
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

        harness.request(context, ($) => {
          expect($('[data-test-id="must-not-met-epics"]').length).toEqual(1);
        });
      }));

      it('should not render the viewEpicList component when not provided with epics that are must and not-met', createTestHarness(setup, (harness) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              must: {
                'not-met': [],
              },
            },
          },
        };

        harness.request(context, ($) => {
          expect($('[data-test-id="some-data-identifier"] .must-not-met-epics').length).toEqual(0);
        });
      }));
    });
  });

  describe('for may epics', () => {
    it('should render the tag if data provided', createTestHarness(setup, (harness) => {
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

      harness.request(context, ($) => {
        expect($('[data-test-id="may-tag"]').text().trim()).toEqual('May epics');
      });
    }));

    it('should render the data if provided', createTestHarness(setup, (harness) => {
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

      harness.request(context, ($) => {
        expect($('[data-test-id="may-epics"]').length).toEqual(1);
      });
    }));

    it('should not render the data if not provided', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: {},
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="may-epics"]').length).toEqual(0);
      });
    }));

    describe('with met type', () => {
      it('should render the viewEpicList component when provided with epics that are may and met', createTestHarness(setup, (harness) => {
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

        harness.request(context, ($) => {
          expect($('[data-test-id="may-met-epics"]').length).toEqual(1);
        });
      }));

      it('should not render the viewEpicList component when not provided with epics that are may and met', createTestHarness(setup, (harness) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              may: {},
            },
          },
        };

        harness.request(context, ($) => {
          expect($('[data-test-id="some-data-identifier"] .may-met-epics').length).toEqual(0);
        });
      }));
    });

    describe('with not-met type', () => {
      it('should render the viewEpicList component when provided with epics that are may and not-met', createTestHarness(setup, (harness) => {
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

        harness.request(context, ($) => {
          expect($('[data-test-id="may-not-met-epics"]').length).toEqual(1);
        });
      }));

      it('should not render the viewEpicList component when not provided with epics that are may and not-met', createTestHarness(setup, (harness) => {
        const context = {
          params: {
            dataTestId: 'some-data-identifier',
            data: {
              may: {},
            },
          },
        };

        harness.request(context, ($) => {
          expect($('[data-test-id="some-data-identifier"] .may-not-met-epics').length).toEqual(0);
        });
      }));
    });
  });

  it('should not render the data when not provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"]').length).toEqual(0);
    });
  }));

  it('should add classes provided within the params', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [],
        classes: 'new-class another-class',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-data-identifier"]').hasClass('bc-c-epics')).toEqual(true);
      expect($('div[data-test-id="some-data-identifier"]').hasClass('new-class')).toEqual(true);
      expect($('div[data-test-id="some-data-identifier"]').hasClass('another-class')).toEqual(true);
    });
  }));
});
