import { componentTester } from '../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewBrowserBased',
    path: 'sections/view-browser-based/macro.njk',
  },
};

describe('view-browser-based', () => {
  it('should render the supported browsers answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'browser-browsers-supported': {
              answers: {
                'supported-browsers': ['chrome'],
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const browserBasedSectionElement = $('[data-test-id="view-section-dl-browser-based"]');
      const questionRow = browserBasedSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(browserBasedSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Supported browser types');
      expect(questionRow.find('dd').text().trim()).toEqual('chrome');
    });
  }));

  it('should render the mobile responsive answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'browser-browsers-supported': {
              answers: {
                'mobile-responsive': 'yes',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const browserBasedSectionElement = $('[data-test-id="view-section-dl-browser-based"]');
      const questionRow = browserBasedSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(browserBasedSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Mobile responsive');
      expect(questionRow.find('dd').text().trim()).toEqual('yes');
    });
  }));

  it('should render the mobile first design answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'browser-mobile-first': {
              answers: {
                'mobile-first-design': 'yes',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const browserBasedSectionElement = $('[data-test-id="view-section-dl-browser-based"]');
      const questionRow = browserBasedSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(browserBasedSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Mobile first approach');
      expect(questionRow.find('dd').text().trim()).toEqual('yes');
    });
  }));

  it('should render the plugins required answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'browser-plug-ins-or-extensions': {
              answers: {
                'plugins-required': 'yes',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const browserBasedSectionElement = $('[data-test-id="view-section-dl-browser-based"]');
      const questionRow = browserBasedSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(browserBasedSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Plug-ins or extensions required');
      expect(questionRow.find('dd').text().trim()).toEqual('yes');
    });
  }));

  it('should render the plugins detail answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'browser-plug-ins-or-extensions': {
              answers: {
                'plugins-detail': 'Some plugin detail',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const browserBasedSectionElement = $('[data-test-id="view-section-dl-browser-based"]');
      const questionRow = browserBasedSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(browserBasedSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Additional information about plug-ins or extensions');
      expect(questionRow.find('dd').text().trim()).toEqual('Some plugin detail');
    });
  }));

  it('should render the minimum connection speed answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'browser-connectivity-and-resolution': {
              answers: {
                'minimum-connection-speed': '1Mbps',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const browserBasedSectionElement = $('[data-test-id="view-section-dl-browser-based"]');
      const questionRow = browserBasedSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(browserBasedSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Minimum connection speed');
      expect(questionRow.find('dd').text().trim()).toEqual('1Mbps');
    });
  }));

  it('should render the minimum desktop resolution answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'browser-connectivity-and-resolution': {
              answers: {
                'minimum-desktop-resolution': '4:3 800 x 600',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const browserBasedSectionElement = $('[data-test-id="view-section-dl-browser-based"]');
      const questionRow = browserBasedSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(browserBasedSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Screen resolution and aspect ratio');
      expect(questionRow.find('dd').text().trim()).toEqual('4:3 800 x 600');
    });
  }));

  it('should render the hardware requirement answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'browser-hardware-requirements': {
              answers: {
                'hardware-requirements-description': 'Some hardware requirement description',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const browserBasedSectionElement = $('[data-test-id="view-section-dl-browser-based"]');
      const questionRow = browserBasedSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(browserBasedSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Hardware requirements');
      expect(questionRow.find('dd').text().trim()).toEqual('Some hardware requirement description');
    });
  }));

  it('should render the additional information answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'browser-additional-information': {
              answers: {
                'additional-information': 'Some additional information',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const browserBasedSectionElement = $('[data-test-id="view-section-dl-browser-based"]');
      const questionRow = browserBasedSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(browserBasedSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Additional information');
      expect(questionRow.find('dd').text().trim()).toEqual('Some additional information');
    });
  }));

  it('should only render the section and answers provided in the context', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'browser-plug-ins-or-extensions': {
              answers: {
                'plugins-required': 'yes',
                'plugins-detail': 'Some plugin detail',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const browserBasedSectionElement = $('[data-test-id="view-section-dl-browser-based"]');
      const questionRow = browserBasedSectionElement.find('div.nhsuk-summary-list__row');

      expect(browserBasedSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(2);
    });
  }));
});
