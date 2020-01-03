import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-native-mobile/macro.njk' import viewNativeMobile %}
                        {{ viewNativeMobile(params) }}`;

describe('view-native-mobile', () => {
  it('should render the supported operating systems answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

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

        done();
      });
  });

  it('should render the additional operating system information answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

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

        done();
      });
  });

  it('should render the mobile first answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

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

        done();
      });
  });

  it('should render the minimum memory requirement answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

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

        done();
      });
  });

  it('should render the additional storage requirements answer', (done) => {
    const context = {
      params: {
        section: {
          sections: {
            'native-mobile-memory-and-storage': {
              answers: {
                'storage-requirements-description': 'You will need at least 4GB of free space on each device the application is installed. It is advised to use an external SD card for additional storage.'
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

        const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
        const storageRequirementsDescriptionQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-storage-requirements-description"]');
        const storageRequirementsDescriptionInnerComponent = storageRequirementsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-storage-requirements-description"]');

        expect(nativeMobileSectionTable.length).toEqual(1);
        expect(storageRequirementsDescriptionQuestionRow.length).toEqual(1);
        expect(storageRequirementsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Additional storage requirements');
        expect(storageRequirementsDescriptionInnerComponent.length).toEqual(1);
        expect(storageRequirementsDescriptionInnerComponent.text().trim()).toEqual('You will need at least 4GB of free space on each device the application is installed. It is advised to use an external SD card for additional storage.');

        done();
      });
  });

  it('should render the minimum connection speed required answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

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

        done();
      });
  });

  it('should render the connection types supported answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

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

        done();
      });
  });

  it('should render the additional information about connection types answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const nativeMobileSectionTable = $('[data-test-id="view-section-table-native-mobile"]');
        const connectionRequirementsDescriptionQuestionRow = nativeMobileSectionTable.find('[data-test-id="view-section-table-row-connection-requirements-description"]');
        const connectionRequirementsDescriptionInnerComponent = connectionRequirementsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-connection-requirements-description"]');

        expect(nativeMobileSectionTable.length).toEqual(1);
        expect(connectionRequirementsDescriptionQuestionRow.length).toEqual(1);
        expect(connectionRequirementsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Additional information about connection types');
        expect(connectionRequirementsDescriptionInnerComponent.length).toEqual(1);
        expect(connectionRequirementsDescriptionInnerComponent.text().trim()).toEqual('Average data usage will vary depending on application activity.');

        done();
      });
  });

  it('should render the third party components answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

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

        done();
      });
  });

  it('should render the device capabilities answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

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

        done();
      });
  });

  it('should render the hardware requirements answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

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

        done();
      });
  });

  it('should render the additional information answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

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

        done();
      });
  });
});
