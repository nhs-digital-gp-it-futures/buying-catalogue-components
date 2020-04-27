import { componentTester } from '../../testUtils/componentTester';

const setup = {
  templateName: 'viewClientApplicationTypes',
  templateType: 'section',
};

describe('view-client-application-types', () => {
  it('should render the title of the section', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {},
      },
    };

    harness.request(context, ($) => {
      expect($('h3').text().trim()).toEqual('Client application type');
    });
  }));

  it('should not render the client-application-types section when not provided', componentTester(setup, (harness) => {
    const context = {
      params: {},
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-client-application-types"]').length).toEqual(0);
    });
  }));

  describe('when a sub section exists for an application type', () => {
    it('should render the browsed based application type', componentTester(setup, (harness) => {
      const context = {
        params: {
          section: {
            sections: {
              'browser-based': {},
            },
          },
        },
      };

      harness.request(context, ($) => {
        const browserBasedExpandableSection = $('[data-test-id="view-section-browser-based"]');
        const browserBasedSection = browserBasedExpandableSection.find('[data-test-id="view-section-table-browser-based"]');

        expect(browserBasedExpandableSection.length).toEqual(1);
        expect(browserBasedSection.length).toEqual(1);
      });
    }));

    it('should render the native mobile application type', componentTester(setup, (harness) => {
      const context = {
        params: {
          section: {
            sections: {
              'native-mobile': {},
            },
          },
        },
      };

      harness.request(context, ($) => {
        const nativeMobileExpandableSection = $('[data-test-id="view-section-native-mobile"]');
        const nativeMobileSection = nativeMobileExpandableSection.find('[data-test-id="view-section-table-native-mobile"]');

        expect(nativeMobileExpandableSection.length).toEqual(1);
        expect(nativeMobileSection.length).toEqual(1);
      });
    }));

    it('should render the native desktop application type', componentTester(setup, (harness) => {
      const context = {
        params: {
          section: {
            sections: {
              'native-desktop': {},
            },
          },
        },
      };

      harness.request(context, ($) => {
        const nativeDesktopExpandableSection = $('[data-test-id="view-section-native-desktop"]');
        const nativeDesktopSection = nativeDesktopExpandableSection.find('[data-test-id="view-section-table-native-desktop"]');

        expect(nativeDesktopExpandableSection.length).toEqual(1);
        expect(nativeDesktopSection.length).toEqual(1);
      });
    }));
  });

  describe('when a sub section does not exist for an application type', () => {
    it('should not render the browsed based application type', componentTester(setup, (harness) => {
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

      harness.request(context, ($) => {
        const browserBasedExpandableSection = $('[data-test-id="view-section-browser-based"]');
        expect(browserBasedExpandableSection.length).toEqual(0);
      });
    }));

    it('should not render the native mobile application type', componentTester(setup, (harness) => {
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

      harness.request(context, ($) => {
        const nativeMobileExpandableSection = $('[data-test-id="view-section-native-mobile"]');
        expect(nativeMobileExpandableSection.length).toEqual(0);
      });
    }));

    it('should not render the native desktop application type', componentTester(setup, (harness) => {
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

      harness.request(context, ($) => {
        const nativeDesktopExpandableSection = $('[data-test-id="view-section-native-desktop"]');

        expect(nativeDesktopExpandableSection.length).toEqual(0);
      });
    }));
  });
});
