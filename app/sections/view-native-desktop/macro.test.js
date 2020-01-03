import request from 'supertest';
import cheerio from 'cheerio';
import { createTestHarness } from '../../testUtils/testHarness';

const macroWrapper = `{% from './sections/view-native-desktop/macro.njk' import viewNativeDesktop %}
                        {{ viewNativeDesktop(params) }}`;

describe('view-native-desktop', () => {
  it('should render the operating system information answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
        const operatingSystemsDescriptionQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-operating-systems-description"]');
        const operatingSystemsDescriptionInnerComponent = operatingSystemsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-operating-systems-description"]');

        expect(nativeDesktopSectionTable.length).toEqual(1);
        expect(operatingSystemsDescriptionQuestionRow.length).toEqual(1);
        expect(operatingSystemsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Supported operating systems');
        expect(operatingSystemsDescriptionInnerComponent.length).toEqual(1);
        expect(operatingSystemsDescriptionInnerComponent.text().trim()).toEqual('Windows 7 and above.');

        done();
      });
  });

  it('should render the minimum connection speed required answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
        const minimumConnectionSpeedQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-minimum-connection-speed"]');
        const minimumConnectionSpeedInnerComponent = minimumConnectionSpeedQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-minimum-connection-speed"]');

        expect(nativeDesktopSectionTable.length).toEqual(1);
        expect(minimumConnectionSpeedQuestionRow.length).toEqual(1);
        expect(minimumConnectionSpeedQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Minimum connection speed required');
        expect(minimumConnectionSpeedInnerComponent.length).toEqual(1);
        expect(minimumConnectionSpeedInnerComponent.text().trim()).toEqual('2Mbps');

        done();
      });
  });

  it('should render the minimum memory requirement answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
        const minimumMemoryRequirementQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-minimum-memory-requirement"]');
        const minimumMemoryRequirementInnerComponent = minimumMemoryRequirementQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-minimum-memory-requirement"]');

        expect(nativeDesktopSectionTable.length).toEqual(1);
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
            'native-desktop-memory-and-storage': {
              answers: {
                'storage-requirements-description': 'You will need at least 2.5GB of free space on each device the application is installed.',
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

        const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
        const storageRequirementsDescriptionQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-storage-requirements-description"]');
        const storageRequirementsDescriptionInnerComponent = storageRequirementsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-storage-requirements-description"]');

        expect(nativeDesktopSectionTable.length).toEqual(1);
        expect(storageRequirementsDescriptionQuestionRow.length).toEqual(1);
        expect(storageRequirementsDescriptionQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Additional storage requirements');
        expect(storageRequirementsDescriptionInnerComponent.length).toEqual(1);
        expect(storageRequirementsDescriptionInnerComponent.text().trim()).toEqual('You will need at least 2.5GB of free space on each device the application is installed.');

        done();
      });
  });

  it('should render the minimum cpu answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
        const minimumCPUQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-minimum-cpu"]');
        const minimumCPUInnerComponent = minimumCPUQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-minimum-cpu"]');

        expect(nativeDesktopSectionTable.length).toEqual(1);
        expect(minimumCPUQuestionRow.length).toEqual(1);
        expect(minimumCPUQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Minimum necessary CPU power');
        expect(minimumCPUInnerComponent.length).toEqual(1);
        expect(minimumCPUInnerComponent.text().trim()).toEqual('Intel Core i5-4460 (3.4GHz) Quad-core or Better.');

        done();
      });
  });

  it('should render the recommended resolution answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
        const recommendedResolutionQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-recommended-resolution"]');
        const recommendedResolutionInnerComponent = recommendedResolutionQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-recommended-resolution"]');

        expect(nativeDesktopSectionTable.length).toEqual(1);
        expect(recommendedResolutionQuestionRow.length).toEqual(1);
        expect(recommendedResolutionQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Recommended desktop aspect ratio and screen resolution');
        expect(recommendedResolutionInnerComponent.length).toEqual(1);
        expect(recommendedResolutionInnerComponent.text().trim()).toEqual('16:9 - 1920 x 1080');

        done();
      });
  });

  it('should render the third party components answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
        const thirdPartyComponentsQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-third-party-components"]');
        const thirdPartyComponentsInnerComponent = thirdPartyComponentsQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-third-party-components"]');

        expect(nativeDesktopSectionTable.length).toEqual(1);
        expect(thirdPartyComponentsQuestionRow.length).toEqual(1);
        expect(thirdPartyComponentsQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Third party components required');
        expect(thirdPartyComponentsInnerComponent.length).toEqual(1);
        expect(thirdPartyComponentsInnerComponent.text().trim()).toEqual('To fully utilise the letter template functionality, you will need a fully licensed version of Microsoft Word 2013 or higher.');

        done();
      });
  });

  it('should render the device capabilities answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
        const deviceCapabilitiesQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-device-capabilities"]');
        const deviceCapabilitiesInnerComponent = deviceCapabilitiesQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-device-capabilities"]');

        expect(nativeDesktopSectionTable.length).toEqual(1);
        expect(deviceCapabilitiesQuestionRow.length).toEqual(1);
        expect(deviceCapabilitiesQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Device capabilities required');
        expect(deviceCapabilitiesInnerComponent.length).toEqual(1);
        expect(deviceCapabilitiesInnerComponent.text().trim()).toEqual('In order to use our branded wireless Dictaphone, the device will require Bluetooth.');

        done();
      });
  });

  it('should render the hardware requirements answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
        const hardwareRequirementsQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-hardware-requirements"]');
        const hardwareRequirementsInnerComponent = hardwareRequirementsQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-hardware-requirements"]');

        expect(nativeDesktopSectionTable.length).toEqual(1);
        expect(hardwareRequirementsQuestionRow.length).toEqual(1);
        expect(hardwareRequirementsQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Hardware requirements');
        expect(hardwareRequirementsInnerComponent.length).toEqual(1);
        expect(hardwareRequirementsInnerComponent.text().trim()).toEqual('To fully utilise the transcribing functionality within the application, you will need to purchase our branded wireless Dictaphone.');

        done();
      });
  });

  it('should render the additional information answer', (done) => {
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

    const dummyApp = createTestHarness(macroWrapper, context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const nativeDesktopSectionTable = $('[data-test-id="view-section-table-native-desktop"]');
        const additionalInformationQuestionRow = nativeDesktopSectionTable.find('[data-test-id="view-section-table-row-additional-information"]');
        const additionalInformationInnerComponent = additionalInformationQuestionRow
          .find('div[data-test-id="view-section-table-row-component"]')
          .find('[data-test-id="view-question-data-text-additional-information"]');

        expect(nativeDesktopSectionTable.length).toEqual(1);
        expect(additionalInformationQuestionRow.length).toEqual(1);
        expect(additionalInformationQuestionRow
          .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Additional information');
        expect(additionalInformationInnerComponent.length).toEqual(1);
        expect(additionalInformationInnerComponent.text().trim()).toEqual('It is possible that it may install on other platforms or versions not listed in this section. However, support is limited to systems that meet the minimum requirements.');

        done();
      });
  });
});
