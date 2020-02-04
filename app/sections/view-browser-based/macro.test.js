import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'viewBrowserBased',
  templateType: 'section',
};

describe('view-browser-based', () => {
  it('should render the supported browsers answer', createTestHarness(setup, (harness) => {
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
      const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
      const supportedBrowserQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-supported-browsers"]');
      const supportedBrowserInnerComponent = supportedBrowserQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-bulletlist"]');

      expect(browserBasedSectionTable.length).toEqual(1);
      expect(supportedBrowserQuestionRow.length).toEqual(1);
      expect(supportedBrowserQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Browsers Supported');
      expect(supportedBrowserInnerComponent.length).toEqual(1);
      expect(supportedBrowserInnerComponent.text().trim()).toEqual('chrome');
    });
  }));

  it('should render the mobile responsive answer', createTestHarness(setup, (harness) => {
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
      const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
      const mobileResponsiveQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-mobile-responsive"]');
      const mobileResponsiveInnerComponent = mobileResponsiveQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-mobile-responsive"]');

      expect(browserBasedSectionTable.length).toEqual(1);
      expect(mobileResponsiveQuestionRow.length).toEqual(1);
      expect(mobileResponsiveQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Mobile responsive');
      expect(mobileResponsiveInnerComponent.length).toEqual(1);
      expect(mobileResponsiveInnerComponent.text().trim()).toEqual('yes');
    });
  }));

  it('should render the mobile first design answer', createTestHarness(setup, (harness) => {
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
      const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
      const mobileFirstDesignQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-mobile-first-design"]');
      const mobileFirstDesignInnerComponent = mobileFirstDesignQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-mobile-first-design"]');

      expect(browserBasedSectionTable.length).toEqual(1);
      expect(mobileFirstDesignQuestionRow.length).toEqual(1);
      expect(mobileFirstDesignQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Designed with a mobile first approach');
      expect(mobileFirstDesignInnerComponent.length).toEqual(1);
      expect(mobileFirstDesignInnerComponent.text().trim()).toEqual('yes');
    });
  }));

  it('should render the plugins required answer', createTestHarness(setup, (harness) => {
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
      const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
      const pluginsRequiredQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-plugins-required"]');
      const pluginsRequiredInnerComponent = pluginsRequiredQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-plugins-required"]');

      expect(browserBasedSectionTable.length).toEqual(1);
      expect(pluginsRequiredQuestionRow.length).toEqual(1);
      expect(pluginsRequiredQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Plug-ins or extensions required');
      expect(pluginsRequiredInnerComponent.length).toEqual(1);
      expect(pluginsRequiredInnerComponent.text().trim()).toEqual('yes');
    });
  }));

  it('should render the plugins detail answer', createTestHarness(setup, (harness) => {
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
      const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
      const pluginsDetailQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-plugins-detail"]');
      const pluginsDetailInnerComponent = pluginsDetailQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-plugins-detail"]');

      expect(browserBasedSectionTable.length).toEqual(1);
      expect(pluginsDetailQuestionRow.length).toEqual(1);
      expect(pluginsDetailQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Plug-ins or extensions information');
      expect(pluginsDetailInnerComponent.length).toEqual(1);
      expect(pluginsDetailInnerComponent.text().trim()).toEqual('Some plugin detail');
    });
  }));

  it('should render the minimum connection speed answer', createTestHarness(setup, (harness) => {
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
      const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
      const minimumConnectionQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-minimum-connection-speed"]');
      const minimumConnectionQuestionInnerComponent = minimumConnectionQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-minimum-connection-speed"]');

      expect(browserBasedSectionTable.length).toEqual(1);
      expect(minimumConnectionQuestionRow.length).toEqual(1);
      expect(minimumConnectionQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Minimum connection speed required');
      expect(minimumConnectionQuestionInnerComponent.length).toEqual(1);
      expect(minimumConnectionQuestionInnerComponent.text().trim()).toEqual('1Mbps');
    });
  }));

  it('should render the minimum desktop resolution answer', createTestHarness(setup, (harness) => {
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
      const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
      const minimumResolutionQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-minimum-desktop-resolution"]');
      const minimumResolutionQuestionInnerComponent = minimumResolutionQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-minimum-desktop-resolution"]');

      expect(browserBasedSectionTable.length).toEqual(1);
      expect(minimumResolutionQuestionRow.length).toEqual(1);
      expect(minimumResolutionQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Recommended desktop aspect ratio and screen resolution');
      expect(minimumResolutionQuestionInnerComponent.length).toEqual(1);
      expect(minimumResolutionQuestionInnerComponent.text().trim()).toEqual('4:3 800 x 600');
    });
  }));

  it('should render the hardware requirement answer', createTestHarness(setup, (harness) => {
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
      const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
      const hardwareRequirementsQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-hardware-requirements-description"]');
      const hardwareRequirementsInnerComponent = hardwareRequirementsQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-hardware-requirements-description"]');

      expect(browserBasedSectionTable.length).toEqual(1);
      expect(hardwareRequirementsQuestionRow.length).toEqual(1);
      expect(hardwareRequirementsQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Hardware requirements');
      expect(hardwareRequirementsInnerComponent.length).toEqual(1);
      expect(hardwareRequirementsInnerComponent.text().trim()).toEqual('Some hardware requirement description');
    });
  }));

  it('should render the additional information answer', createTestHarness(setup, (harness) => {
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
      const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
      const additionalInformationQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-additional-information"]');
      const additionalInformationInnerComponent = additionalInformationQuestionRow
        .find('div[data-test-id="view-section-table-row-component"]')
        .find('[data-test-id="view-question-data-text-additional-information"]');

      expect(browserBasedSectionTable.length).toEqual(1);
      expect(additionalInformationQuestionRow.length).toEqual(1);
      expect(additionalInformationQuestionRow
        .find('div[data-test-id="view-section-table-row-title"]').text().trim()).toEqual('Additional information');
      expect(additionalInformationInnerComponent.length).toEqual(1);
      expect(additionalInformationInnerComponent.text().trim()).toEqual('Some additional information');
    });
  }));

  it('should only render the section and answers provided in the context', createTestHarness(setup, (harness) => {
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
      const browserBasedSectionTable = $('[data-test-id="view-section-table-browser-based"]');
      const supportedBrowserQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-supported-browsers"]');
      const mobileResponsiveQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-mobile-responsive"]');
      const pluginsRequiredQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-plugins-required"]');
      const pluginsDetailQuestionRow = browserBasedSectionTable.find('[data-test-id="view-section-table-row-plugins-detail"]');

      expect(browserBasedSectionTable.length).toEqual(1);
      expect(supportedBrowserQuestionRow.length).toEqual(0);
      expect(mobileResponsiveQuestionRow.length).toEqual(0);
      expect(pluginsRequiredQuestionRow.length).toEqual(1);
      expect(pluginsDetailQuestionRow.length).toEqual(1);
    });
  }));
});
