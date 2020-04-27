import { componentTester } from '../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewHostingTypes',
    path: 'sections/view-hosting-types/macro.njk',
  },
};

const context = {
  params: {
    sections: {},
  },
};

describe('view-hosting-types', () => {
  it('should render the title of the section if the public cloud section is provided', componentTester(setup, (harness) => {
    const modifiedContext = { ...context };
    modifiedContext.params.sections = { 'hosting-type-public-cloud': {} };
    harness.request(modifiedContext, ($) => {
      expect($('h3').text().trim()).toEqual('Hosting type');
    });
  }));

  it('should render the title of the section if the private section is provided', componentTester(setup, (harness) => {
    const modifiedContext = { ...context };
    modifiedContext.params.sections = { 'hosting-type-private-cloud': {} };

    harness.request(modifiedContext, ($) => {
      expect($('h3').text().trim()).toEqual('Hosting type');
    });
  }));

  it('should render the title of the section if the hybrid section is provided', componentTester(setup, (harness) => {
    const modifiedContext = { ...context };
    modifiedContext.params.sections = { 'hosting-type-hybrid': {} };

    harness.request(modifiedContext, ($) => {
      expect($('h3').text().trim()).toEqual('Hosting type');
    });
  }));

  it('should render the title of the section if the on-premise section is provided', componentTester(setup, (harness) => {
    const modifiedContext = { ...context };
    modifiedContext.params.sections = { 'hosting-type-on-premise': {} };

    harness.request(modifiedContext, ($) => {
      expect($('h3').text().trim()).toEqual('Hosting type');
    });
  }));

  it('should not render the hosting-types section when none of the hosting sections are provided', componentTester(setup, (harness) => {
    const modifiedContext = { ...context };
    modifiedContext.params.sections = {};

    harness.request(modifiedContext, ($) => {
      expect($('[data-test-id="view-hosting-types"]').length).toEqual(0);
    });
  }));

  describe('when a sub section exists for a hosting type', () => {
    it('should render the public cloud hosting type', componentTester(setup, (harness) => {
      const modifiedContext = { ...context };
      modifiedContext.params.sections = { 'hosting-type-public-cloud': {} };
      harness.request(modifiedContext, ($) => {
        const publicCloudExpandableSection = $('[data-test-id="view-section-hosting-type-public-cloud"]');
        const publicCloudSection = publicCloudExpandableSection.find('[data-test-id="view-section-table-hosting-type-public-cloud"]');

        expect(publicCloudExpandableSection.length).toEqual(1);
        expect(publicCloudSection.length).toEqual(1);
      });
    }));

    it('should render the private cloud hosting type', componentTester(setup, (harness) => {
      const modifiedContext = { ...context };
      modifiedContext.params.sections = { 'hosting-type-private-cloud': {} };

      harness.request(modifiedContext, ($) => {
        const privateCloudExpandableSection = $('[data-test-id="view-section-hosting-type-private-cloud"]');
        const privateCloudSection = privateCloudExpandableSection.find('[data-test-id="view-section-table-hosting-type-private-cloud"]');

        expect(privateCloudExpandableSection.length).toEqual(1);
        expect(privateCloudSection.length).toEqual(1);
      });
    }));

    it('should render the hybrid hosting type', componentTester(setup, (harness) => {
      const modifiedContext = { ...context };
      modifiedContext.params.sections = { 'hosting-type-hybrid': {} };

      harness.request(modifiedContext, ($) => {
        const hybridExpandableSection = $('[data-test-id="view-section-hosting-type-hybrid"]');
        const hybridSection = hybridExpandableSection.find('[data-test-id="view-section-table-hosting-type-hybrid"]');

        expect(hybridExpandableSection.length).toEqual(1);
        expect(hybridSection.length).toEqual(1);
      });
    }));

    it('should render the on premise hosting type', componentTester(setup, (harness) => {
      const modifiedContext = { ...context };
      modifiedContext.params.sections = { 'hosting-type-on-premise': {} };

      harness.request(modifiedContext, ($) => {
        const onPremiseExpandableSection = $('[data-test-id="view-section-hosting-type-on-premise"]');
        const onPremiseSection = onPremiseExpandableSection.find('[data-test-id="view-section-table-hosting-type-on-premise"]');

        expect(onPremiseExpandableSection.length).toEqual(1);
        expect(onPremiseSection.length).toEqual(1);
      });
    }));
  });

  describe('when a sub section does not exist for a hosting type', () => {
    const modifiedContext = { ...context };
    beforeEach(() => {
      modifiedContext.params.sections = {
        'some-other-section': {
          answers: {
            'some-question': 'Some data',
          },
        },
      };
    });

    it('should not render the public cloud hosting type', componentTester(setup, (harness) => {
      harness.request(modifiedContext, ($) => {
        const publicCloudExpandableSection = $('[data-test-id="view-section-hosting-type-public-cloud"]');
        expect(publicCloudExpandableSection.length).toEqual(0);
      });
    }));

    it('should not render the private cloud hosting type', componentTester(setup, (harness) => {
      harness.request(modifiedContext, ($) => {
        const privateCloudExpandableSection = $('[data-test-id="view-section-hosting-type-private-cloud"]');
        expect(privateCloudExpandableSection.length).toEqual(0);
      });
    }));

    it('should not render the hybrid hosting type', componentTester(setup, (harness) => {
      harness.request(modifiedContext, ($) => {
        const hybridExpandableSection = $('[data-test-id="view-section-hosting-type-hybrid"]');
        expect(hybridExpandableSection.length).toEqual(0);
      });
    }));

    it('should not render the on premise hosting type', componentTester(setup, (harness) => {
      harness.request(modifiedContext, ($) => {
        const onPremiseExpandableSection = $('[data-test-id="view-section-hosting-type-on-premise"]');
        expect(onPremiseExpandableSection.length).toEqual(0);
      });
    }));
  });
});
