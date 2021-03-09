import { componentTester } from '../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewNativeDesktop',
    path: 'sections/view-native-desktop/macro.njk',
  },
};

describe('view-native-desktop', () => {
  it('should render the operating system information answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-desktop-operating-systems': {
              answers: {
                'operating-systems-description': 'Windows 7 and above.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeDesktopSectionElement = $('[data-test-id="view-section-dl-native-desktop"]');
      const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeDesktopSectionElement.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);

      expect(operatingSystemsDescriptionQuestionRow
        .find('dt').text().trim()).toEqual('Supported operating systems');
      expect(operatingSystemsDescriptionQuestionRow
        .find('dd').text().trim()).toEqual('Windows 7 and above.');
    });
  }));

  it('should render the minimum connection speed required answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-desktop-connection-details': {
              answers: {
                'minimum-connection-speed': '2Mbps',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeDesktopSectionElement = $('[data-test-id="view-section-dl-native-desktop"]');
      const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeDesktopSectionElement.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);

      expect(operatingSystemsDescriptionQuestionRow
        .find('dt').text().trim()).toEqual('Minimum connection speed');
      expect(operatingSystemsDescriptionQuestionRow
        .find('dd').text().trim()).toEqual('2Mbps');
    });
  }));

  it('should render the minimum memory requirement answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-desktop-memory-and-storage': {
              answers: {
                'minimum-memory-requirement': '4GB',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeDesktopSectionElement = $('[data-test-id="view-section-dl-native-desktop"]');
      const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeDesktopSectionElement.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);

      expect(operatingSystemsDescriptionQuestionRow
        .find('dt').text().trim()).toEqual('Memory size');
      expect(operatingSystemsDescriptionQuestionRow
        .find('dd').text().trim()).toEqual('4GB');
    });
  }));

  it('should render the additional storage requirements answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-desktop-memory-and-storage': {
              answers: {
                'storage-requirements-description': 'You will need at least 2.5GB of free space on each device the application is installed.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeDesktopSectionElement = $('[data-test-id="view-section-dl-native-desktop"]');
      const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeDesktopSectionElement.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);

      expect(operatingSystemsDescriptionQuestionRow
        .find('dt').text().trim()).toEqual('Storage space');
      expect(operatingSystemsDescriptionQuestionRow
        .find('dd').text().trim()).toEqual('You will need at least 2.5GB of free space on each device the application is installed.');
    });
  }));

  it('should render the minimum cpu answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-desktop-memory-and-storage': {
              answers: {
                'minimum-cpu': 'Intel Core i5-4460 (3.4GHz) Quad-core or Better.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeDesktopSectionElement = $('[data-test-id="view-section-dl-native-desktop"]');
      const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeDesktopSectionElement.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);

      expect(operatingSystemsDescriptionQuestionRow
        .find('dt').text().trim()).toEqual('Processing power');
      expect(operatingSystemsDescriptionQuestionRow
        .find('dd').text().trim()).toEqual('Intel Core i5-4460 (3.4GHz) Quad-core or Better.');
    });
  }));

  it('should render the recommended resolution answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-desktop-memory-and-storage': {
              answers: {
                'recommended-resolution': '16:9 - 1920 x 1080',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeDesktopSectionElement = $('[data-test-id="view-section-dl-native-desktop"]');
      const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeDesktopSectionElement.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);

      expect(operatingSystemsDescriptionQuestionRow
        .find('dt').text().trim()).toEqual('Screen resolution and aspect ratio');
      expect(operatingSystemsDescriptionQuestionRow
        .find('dd').text().trim()).toEqual('16:9 - 1920 x 1080');
    });
  }));

  it('should render the third party components answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-desktop-third-party': {
              answers: {
                'third-party-components': 'To fully utilise the letter template functionality, you will need a fully licensed version of Microsoft Word 2013 or higher.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeDesktopSectionElement = $('[data-test-id="view-section-dl-native-desktop"]');
      const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeDesktopSectionElement.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);

      expect(operatingSystemsDescriptionQuestionRow
        .find('dt').text().trim()).toEqual('Third-party components');
      expect(operatingSystemsDescriptionQuestionRow
        .find('dd').text().trim()).toEqual('To fully utilise the letter template functionality, you will need a fully licensed version of Microsoft Word 2013 or higher.');
    });
  }));

  it('should render the device capabilities answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-desktop-third-party': {
              answers: {
                'device-capabilities': 'In order to use our branded wireless Dictaphone, the device will require Bluetooth.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeDesktopSectionElement = $('[data-test-id="view-section-dl-native-desktop"]');
      const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeDesktopSectionElement.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);

      expect(operatingSystemsDescriptionQuestionRow
        .find('dt').text().trim()).toEqual('Device capabilities');
      expect(operatingSystemsDescriptionQuestionRow
        .find('dd').text().trim()).toEqual('In order to use our branded wireless Dictaphone, the device will require Bluetooth.');
    });
  }));

  it('should render the hardware requirements answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-desktop-hardware-requirements': {
              answers: {
                'hardware-requirements': 'To fully utilise the transcribing functionality within the application, you will need to purchase our branded wireless Dictaphone.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeDesktopSectionElement = $('[data-test-id="view-section-dl-native-desktop"]');
      const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeDesktopSectionElement.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);

      expect(operatingSystemsDescriptionQuestionRow
        .find('dt').text().trim()).toEqual('Hardware requirements');
      expect(operatingSystemsDescriptionQuestionRow
        .find('dd').text().trim()).toEqual('To fully utilise the transcribing functionality within the application, you will need to purchase our branded wireless Dictaphone.');
    });
  }));

  it('should render the additional information answer', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-desktop-additional-information': {
              answers: {
                'additional-information': 'It is possible that it may install on other platforms or versions not listed in this section. However, support is limited to systems that meet the minimum requirements.',
              },
            },
          },
        },
      },
    };

    harness.request(context, ($) => {
      const nativeDesktopSectionElement = $('[data-test-id="view-section-dl-native-desktop"]');
      const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionElement.find('div.nhsuk-summary-list__row:nth-child(1)');

      expect(nativeDesktopSectionElement.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);

      expect(operatingSystemsDescriptionQuestionRow
        .find('dt').text().trim()).toEqual('Additional information');
      expect(operatingSystemsDescriptionQuestionRow
        .find('dd').text().trim()).toEqual('It is possible that it may install on other platforms or versions not listed in this section. However, support is limited to systems that meet the minimum requirements.');
    });
  }));
});
