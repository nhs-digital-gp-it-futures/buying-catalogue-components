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
      const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
      const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-operating-systems-description"]');
      const operatingSystemsDescriptionInnerComponent = operatingSystemsDescriptionQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-operating-systems-description"]');

      expect(nativeDesktopSectionTable.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Supported operating systems');
      expect(operatingSystemsDescriptionInnerComponent.length).toEqual(1);
      expect(operatingSystemsDescriptionInnerComponent.text().trim()).toEqual('Windows 7 and above.');
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
      const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
      const minimumConnectionSpeedQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-minimum-connection-speed"]');
      const minimumConnectionSpeedInnerComponent = minimumConnectionSpeedQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-minimum-connection-speed"]');

      expect(nativeDesktopSectionTable.length).toEqual(1);
      expect(minimumConnectionSpeedQuestionRow.length).toEqual(1);
      expect(minimumConnectionSpeedQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Minimum connection speed');
      expect(minimumConnectionSpeedInnerComponent.length).toEqual(1);
      expect(minimumConnectionSpeedInnerComponent.text().trim()).toEqual('2Mbps');
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
      const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
      const minimumMemoryRequirementQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-minimum-memory-requirement"]');
      const minimumMemoryRequirementInnerComponent = minimumMemoryRequirementQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-minimum-memory-requirement"]');

      expect(nativeDesktopSectionTable.length).toEqual(1);
      expect(minimumMemoryRequirementQuestionRow.length).toEqual(1);
      expect(minimumMemoryRequirementQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Memory size');
      expect(minimumMemoryRequirementInnerComponent.length).toEqual(1);
      expect(minimumMemoryRequirementInnerComponent.text().trim()).toEqual('4GB');
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
      const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
      const storageReqsDescriptionQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-storage-requirements-description"]');
      const storageReqsDescriptionInnerComponent = storageReqsDescriptionQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-storage-requirements-description"]');

      expect(nativeDesktopSectionTable.length).toEqual(1);
      expect(storageReqsDescriptionQuestionRow.length).toEqual(1);
      expect(storageReqsDescriptionQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Storage space');
      expect(storageReqsDescriptionInnerComponent.length).toEqual(1);
      expect(storageReqsDescriptionInnerComponent.text().trim()).toEqual('You will need at least 2.5GB of free space on each device the application is installed.');
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
      const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
      const minimumCPUQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-minimum-cpu"]');
      const minimumCPUInnerComponent = minimumCPUQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-minimum-cpu"]');

      expect(nativeDesktopSectionTable.length).toEqual(1);
      expect(minimumCPUQuestionRow.length).toEqual(1);
      expect(minimumCPUQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Processing power');
      expect(minimumCPUInnerComponent.length).toEqual(1);
      expect(minimumCPUInnerComponent.text().trim()).toEqual('Intel Core i5-4460 (3.4GHz) Quad-core or Better.');
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
      const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
      const recommendedResolutionQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-recommended-resolution"]');
      const recommendedResolutionInnerComponent = recommendedResolutionQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-recommended-resolution"]');

      expect(nativeDesktopSectionTable.length).toEqual(1);
      expect(recommendedResolutionQuestionRow.length).toEqual(1);
      expect(recommendedResolutionQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Screen resolution and aspect ratio');
      expect(recommendedResolutionInnerComponent.length).toEqual(1);
      expect(recommendedResolutionInnerComponent.text().trim()).toEqual('16:9 - 1920 x 1080');
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
      const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
      const thirdPartyComponentsQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-third-party-components"]');
      const thirdPartyComponentsInnerComponent = thirdPartyComponentsQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-third-party-components"]');

      expect(nativeDesktopSectionTable.length).toEqual(1);
      expect(thirdPartyComponentsQuestionRow.length).toEqual(1);
      expect(thirdPartyComponentsQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Third-party components');
      expect(thirdPartyComponentsInnerComponent.length).toEqual(1);
      expect(thirdPartyComponentsInnerComponent.text().trim()).toEqual('To fully utilise the letter template functionality, you will need a fully licensed version of Microsoft Word 2013 or higher.');
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
      const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
      const deviceCapabilitiesQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-device-capabilities"]');
      const deviceCapabilitiesInnerComponent = deviceCapabilitiesQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-device-capabilities"]');

      expect(nativeDesktopSectionTable.length).toEqual(1);
      expect(deviceCapabilitiesQuestionRow.length).toEqual(1);
      expect(deviceCapabilitiesQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Device capabilities');
      expect(deviceCapabilitiesInnerComponent.length).toEqual(1);
      expect(deviceCapabilitiesInnerComponent.text().trim()).toEqual('In order to use our branded wireless Dictaphone, the device will require Bluetooth.');
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
      const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
      const hardwareRequirementsQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-hardware-requirements"]');
      const hardwareRequirementsInnerComponent = hardwareRequirementsQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-hardware-requirements"]');

      expect(nativeDesktopSectionTable.length).toEqual(1);
      expect(hardwareRequirementsQuestionRow.length).toEqual(1);
      expect(hardwareRequirementsQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Hardware requirements');
      expect(hardwareRequirementsInnerComponent.length).toEqual(1);
      expect(hardwareRequirementsInnerComponent.text().trim()).toEqual('To fully utilise the transcribing functionality within the application, you will need to purchase our branded wireless Dictaphone.');
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
      const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
      const additionalInformationQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-additional-information"]');
      const additionalInformationInnerComponent = additionalInformationQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-additional-information"]');

      expect(nativeDesktopSectionTable.length).toEqual(1);
      expect(additionalInformationQuestionRow.length).toEqual(1);
      expect(additionalInformationQuestionRow
        .find('h4[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Additional information');
      expect(additionalInformationInnerComponent.length).toEqual(1);
      expect(additionalInformationInnerComponent.text().trim()).toEqual('It is possible that it may install on other platforms or versions not listed in this section. However, support is limited to systems that meet the minimum requirements.');
    });
  }));
});
