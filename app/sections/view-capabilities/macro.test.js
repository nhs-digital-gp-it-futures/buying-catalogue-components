import { createTestHarness } from '../../testUtils/testHarness';

const setup = {
  templateName: 'viewCapabilities',
  templateType: 'section',
};

describe('view-capabilities', () => {
  it('should render the title of the section', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        capabilities: [
          {
            name: 'Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
          },
        ],
      },
    };

    harness.request(context, ($) => {
      expect($('h3').text().trim()).toEqual('Capabilities met');
    });
  }));

  it('should render the capability expandable sections if data provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        capabilities: [
          {
            name: 'Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
          },
          {
            name: 'Social Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
          },
        ],
      },
    };

    harness.request(context, ($) => {
      const viewCapabilities = $('[data-test-id="view-capabilities"]');
      const viewSectionCapabilities = viewCapabilities.find('[data-test-id="view-section-capabilities"]');
      expect(viewSectionCapabilities.length).toEqual(2);
    });
  }));

  it('should not render the capability expandable sections if capabilities data not provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        capabilities: [],
      },
    };

    harness.request(context, ($) => {
      const viewCapabilities = $('[data-test-id="view-capabilities"]');
      const viewSectionCapabilities = viewCapabilities.find('[data-test-id="view-section-capabilities"]');
      expect(viewSectionCapabilities.length).toEqual(0);
    });
  }));

  it('should render the name and version of the expandable section', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        capabilities: [
          {
            name: 'Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
          },
        ],
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-section-capabilities"] .nhsuk-details__summary-text').text().trim()).toEqual('Prescribing, 1.0');
    });
  }));

  it('should render the capability description', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        capabilities: [
          {
            name: 'Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
          },
        ],
      },
    };

    harness.request(context, ($) => {
      const viewCapabilities = $('[data-test-id="view-capabilities"]');
      const viewSectionCapabilities = viewCapabilities.find('[data-test-id="view-section-capabilities"]');
      const viewCapabilitiesDescription = viewSectionCapabilities.find('[data-test-id="view-question-data-text-description"]');

      expect(viewCapabilitiesDescription.text().trim()).toEqual('Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.');
    });
  }));

  it('should render the capability link', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        capabilities: [
          {
            name: 'Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
          },
        ],
      },
    };

    harness.request(context, ($) => {
      const viewCapabilities = $('[data-test-id="view-capabilities"]');
      const viewSectionCapabilities = viewCapabilities.find('[data-test-id="view-section-capabilities"]');
      const viewCapabilitiesLink = viewSectionCapabilities.find('[data-test-id="view-question-data-text-link"] a');

      expect(viewCapabilitiesLink.length).toEqual(1);
      expect(viewCapabilitiesLink.attr('href')).toEqual('http://www.some-prescribing-link.com');
    });
  }));

  it('should render the capability epic', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        capabilities: [
          {
            name: 'Prescribing',
            version: '1.0',
            description: 'Supports the effective and safe prescribing of medical products and appliances to Patients. Information to support prescribing will be available.',
            link: 'http://www.some-prescribing-link.com',
            epic: [
              {
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
            ],
          },
        ],
      },
    };

    harness.request(context, ($) => {
      const viewCapabilities = $('[data-test-id="view-capabilities"]');
      const viewSectionCapabilities = viewCapabilities.find('[data-test-id="view-section-capabilities"]');
      const viewCapabilitiesEpic = viewSectionCapabilities.find('[data-test-id="view-question-epic"]');

      expect(viewCapabilitiesEpic.length).toEqual(1);
    });
  }));
});
