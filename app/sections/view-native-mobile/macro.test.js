import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'viewNativeMobile',
  templateType: 'section',
};

describe('view-native-mobile', () => {
  it('should render the supported operating systems answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const operatingSystemsQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-operating-systems"]');
      const operatingSystemsInnerComponent = operatingSystemsQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-bulletlist"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(operatingSystemsQuestionRow.length).toEqual(1);
      expect(operatingSystemsQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Supported operating systems');
      expect(operatingSystemsInnerComponent.length).toEqual(1);
      expect(operatingSystemsInnerComponent.text().trim()).toEqual('Apple IOS');
    });
  }));

  it('should render the additional operating system information answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const operatingSystemsDescriptionQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-operating-systems-description"]');
      const operatingSystemsDescriptionInnerComponent = operatingSystemsDescriptionQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-operating-systems-description"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);
      expect(operatingSystemsDescriptionQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Additional operating system information');
      expect(operatingSystemsDescriptionInnerComponent.length).toEqual(1);
      expect(operatingSystemsDescriptionInnerComponent.text().trim()).toEqual('Android 4.1 and above, IOS 10.6 and above.');
    });
  }));

  it('should render the mobile first answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const mobileFirstDesignQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-mobile-first-design"]');
      const mobileFirstDesignInnerComponent = mobileFirstDesignQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-mobile-first-design"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(mobileFirstDesignQuestionRow.length).toEqual(1);
      expect(mobileFirstDesignQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Designed with a mobile first approach');
      expect(mobileFirstDesignInnerComponent.length).toEqual(1);
      expect(mobileFirstDesignInnerComponent.text().trim()).toEqual('Yes');
    });
  }));

  it('should render the minimum memory requirement answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const minimumMemoryRequirementQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-minimum-memory-requirement"]');
      const minimumMemoryRequirementInnerComponent = minimumMemoryRequirementQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-minimum-memory-requirement"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(minimumMemoryRequirementQuestionRow.length).toEqual(1);
      expect(minimumMemoryRequirementQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Minimum memory requirement');
      expect(minimumMemoryRequirementInnerComponent.length).toEqual(1);
      expect(minimumMemoryRequirementInnerComponent.text().trim()).toEqual('4GB');
    });
  }));

  it('should render the additional storage requirements answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const storageReqsDescriptionQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-storage-requirements-description"]');
      const storageReqsDescriptionInnerComponent = storageReqsDescriptionQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-storage-requirements-description"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(storageReqsDescriptionQuestionRow.length).toEqual(1);
      expect(storageReqsDescriptionQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Additional storage requirements');
      expect(storageReqsDescriptionInnerComponent.length).toEqual(1);
      expect(storageReqsDescriptionInnerComponent.text().trim()).toEqual('You will need at least 4GB of free space on each device the application is installed. It is advised to use an external SD card for additional storage.');
    });
  }));

  it('should render the minimum connection speed required answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const minimumConnectionSpeedQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-minimum-connection-speed"]');
      const minimumConnectionSpeedInnerComponent = minimumConnectionSpeedQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-minimum-connection-speed"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(minimumConnectionSpeedQuestionRow.length).toEqual(1);
      expect(minimumConnectionSpeedQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Minimum connection speed required');
      expect(minimumConnectionSpeedInnerComponent.length).toEqual(1);
      expect(minimumConnectionSpeedInnerComponent.text().trim()).toEqual('1Mbps');
    });
  }));

  it('should render the connection types supported answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const connectionTypesQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-connection-types"]');
      const connectionTypesInnerComponent = connectionTypesQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-bulletlist"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(connectionTypesQuestionRow.length).toEqual(1);
      expect(connectionTypesQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Connection types supported');
      expect(connectionTypesInnerComponent.length).toEqual(1);
      expect(connectionTypesInnerComponent.text().trim()).toEqual('GPRS');
    });
  }));

  it('should render the additional information about connection types answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const connectionReqsDescriptionQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-connection-requirements-description"]');
      const connectionReqsDescriptionInnerComponent = connectionReqsDescriptionQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-connection-requirements-description"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(connectionReqsDescriptionQuestionRow.length).toEqual(1);
      expect(connectionReqsDescriptionQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Additional information about connection types');
      expect(connectionReqsDescriptionInnerComponent.length).toEqual(1);
      expect(connectionReqsDescriptionInnerComponent.text().trim()).toEqual('Average data usage will vary depending on application activity.');
    });
  }));

  it('should render the third party components answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const thirdPartyComponentsQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-third-party-components"]');
      const thirdPartyComponentsInnerComponent = thirdPartyComponentsQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-third-party-components"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(thirdPartyComponentsQuestionRow.length).toEqual(1);
      expect(thirdPartyComponentsQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Third party components required');
      expect(thirdPartyComponentsInnerComponent.length).toEqual(1);
      expect(thirdPartyComponentsInnerComponent.text().trim()).toEqual('The application supports and requires an authenticator on each device the application is installed. You will need a software-based authenticator that implements a two-step verification service.');
    });
  }));

  it('should render the device capabilities answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const deviceCapabilitiesQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-device-capabilities"]');
      const deviceCapabilitiesInnerComponent = deviceCapabilitiesQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-device-capabilities"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(deviceCapabilitiesQuestionRow.length).toEqual(1);
      expect(deviceCapabilitiesQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Device capabilities required');
      expect(deviceCapabilitiesInnerComponent.length).toEqual(1);
      expect(deviceCapabilitiesInnerComponent.text().trim()).toEqual('In order to use our file hosting services, the application will require permission to access device storage.');
    });
  }));

  it('should render the hardware requirements answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const hardwareRequirementsQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-hardware-requirements"]');
      const hardwareRequirementsInnerComponent = hardwareRequirementsQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-hardware-requirements"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(hardwareRequirementsQuestionRow.length).toEqual(1);
      expect(hardwareRequirementsQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Hardware requirements');
      expect(hardwareRequirementsInnerComponent.length).toEqual(1);
      expect(hardwareRequirementsInnerComponent.text().trim()).toEqual('To fully utilise our print functionality within the application, you will need a WiFi or Bluetooth connected printer to connect and print documents straight from the device.');
    });
  }));

  it('should render the additional information answer', createTestHarness(setup, (harness) => {
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
      const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
      const additionalInformationQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-additional-information"]');
      const additionalInformationInnerComponent = additionalInformationQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-additional-information"]');

      expect(nativeMobileSectionTable.length).toEqual(1);
      expect(additionalInformationQuestionRow.length).toEqual(1);
      expect(additionalInformationQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Additional information');
      expect(additionalInformationInnerComponent.length).toEqual(1);
      expect(additionalInformationInnerComponent.text().trim()).toEqual('It is possible that it may install on other platforms or versions not listed in this section. However, support is limited to systems that meet the minimum requirements.');
    });
  }));
});
