import { componentTester } from '../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewNativeMobile',
    path: 'sections/view-native-mobile/macro.njk',
  },
};

describe('view-native-mobile', () => {
  it('should render the supported operating systems answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-operating-systems': {
              answers: {
                'operating-systems': ['Apple IOS'],
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Supported operating systems');
      expect(questionRow.find('dd').text().trim()).toEqual('Apple IOS');
    });
  }));

  it('should render the additional operating system information answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-operating-systems': {
              answers: {
                'operating-systems-description': 'Android 4.1 and above, IOS 10.6 and above.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Description of supported operating systems');
      expect(questionRow.find('dd').text().trim()).toEqual('Android 4.1 and above, IOS 10.6 and above.');
    });
  }));

  it('should render the mobile first answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-first': {
              answers: {
                'mobile-first-design': 'Yes',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Mobile first approach');
      expect(questionRow.find('dd').text().trim()).toEqual('Yes');
    });
  }));

  it('should render the minimum connection speed required answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-connection-details': {
              answers: {
                'minimum-connection-speed': '1Mbps',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Minimum connection speed');
      expect(questionRow.find('dd').text().trim()).toEqual('1Mbps');
    });
  }));

  it('should render the connection types supported answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-connection-details': {
              answers: {
                'connection-types': ['GPRS'],
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Connection types supported');
      expect(questionRow.find('dd').text().trim()).toEqual('GPRS');
    });
  }));

  it('should render the additional information about connection types answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-connection-details': {
              answers: {
                'connection-requirements-description': 'Average data usage will vary depending on application activity.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Connection requirements');
      expect(questionRow.find('dd').text().trim()).toEqual('Average data usage will vary depending on application activity.');
    });
  }));

  it('should render the minimum memory requirement answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-memory-and-storage': {
              answers: {
                'minimum-memory-requirement': '4GB',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Memory size');
      expect(questionRow.find('dd').text().trim()).toEqual('4GB');
    });
  }));

  it('should render the additional storage requirements answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-memory-and-storage': {
              answers: {
                'storage-requirements-description': 'You will need at least 4GB of free space on each device the application is installed. It is advised to use an external SD card for additional storage.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Storage space');
      expect(questionRow.find('dd').text().trim()).toEqual('You will need at least 4GB of free space on each device the application is installed. It is advised to use an external SD card for additional storage.');
    });
  }));

  it('should render the third party components answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-third-party': {
              answers: {
                'third-party-components': 'The application supports and requires an authenticator on each device the application is installed. You will need a software-based authenticator that implements a two-step verification service.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Third-party components');
      expect(questionRow.find('dd').text().trim()).toEqual('The application supports and requires an authenticator on each device the application is installed. You will need a software-based authenticator that implements a two-step verification service.');
    });
  }));

  it('should render the device capabilities answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-third-party': {
              answers: {
                'device-capabilities': 'In order to use our file hosting services, the application will require permission to access device storage.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Device capabilities');
      expect(questionRow.find('dd').text().trim()).toEqual('In order to use our file hosting services, the application will require permission to access device storage.');
    });
  }));

  it('should render the hardware requirements answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-hardware-requirements': {
              answers: {
                'hardware-requirements': 'To fully utilise our print functionality within the application, you will need a WiFi or Bluetooth connected printer to connect and print documents straight from the device.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Hardware requirements');
      expect(questionRow.find('dd').text().trim()).toEqual('To fully utilise our print functionality within the application, you will need a WiFi or Bluetooth connected printer to connect and print documents straight from the device.');
    });
  }));

  it('should render the additional information answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-additional-information': {
              answers: {
                'additional-information': 'It is possible that it may install on other platforms or versions not listed in this section. However, support is limited to systems that meet the minimum requirements.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeMobileSectionElement = $('[data-test-id="view-section-dl-native-mobile"]');
      const questionRow = nativeMobileSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeMobileSectionElement.length).toEqual(1);
      expect(questionRow.length).toEqual(1);

      expect(questionRow.find('dt').text().trim()).toEqual('Additional information');
      expect(questionRow.find('dd').text().trim()).toEqual('It is possible that it may install on other platforms or versions not listed in this section. However, support is limited to systems that meet the minimum requirements.');
    });
  }));
});
