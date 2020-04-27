import { componentTester } from '../../testUtils/componentTester';

const setup = {
  component: {
    name: 'viewSolutionContactDetails',
    path: 'sections/view-solution-contact-details/macro.njk',
  },
};

describe('view-solution-contact-details', () => {
  it('should render the title of the section', componentTester(setup, (harness) => {
    const context = {
      params: {
        section: {},
      },
    };

    harness.request(context, ($) => {
      expect($('h3').text().trim()).toEqual('Contact details');
    });
  }));

  it('should not render the solution-contact-details section when not provided', componentTester(setup, (harness) => {
    const context = {
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-contact-details"]').length).toEqual(0);
    });
  }));

  it('should render the contact 1 details', componentTester(setup, (harness) => {
    const contact1 = {
      'contact-name': 'jim jones',
      'department-name': 'a contact dept',
      'phone-number': '0111 111111',
      'email-address': 'jim@solution.com',
    };
    const context = {
      params: {
        section: {
          answers: {
            'contact-1': contact1,
          },
        },
      },
    };

    harness.request(context, ($) => {
      const contact1component = $('[data-test-id="view-section-question-contact-1"]');

      expect(contact1component.find('[data-test-id="view-question-data-text-contact-name"]').text().trim()).toEqual(contact1['contact-name']);
      expect(contact1component.find('[data-test-id="view-question-data-text-department-name"]').text().trim()).toEqual(contact1['department-name']);
      expect(contact1component.find('[data-test-id="view-question-data-text-phone-number"]').text().trim()).toEqual(contact1['phone-number']);
      expect(contact1component.find('[data-test-id="view-question-data-text-email-address"]').text().trim()).toEqual(contact1['email-address']);
    });
  }));

  it('should render the contact 2 details', componentTester(setup, (harness) => {
    const contact2 = {
      'contact-name': 'jim jones jr',
      'department-name': 'a second contact dept',
      'phone-number': '0111 111112',
      'email-address': 'jim2@solution.com',
    };
    const context = {
      params: {
        section: {
          answers: {
            'contact-2': contact2,
          },
        },
      },
    };

    harness.request(context, ($) => {
      const contact2component = $('[data-test-id="view-section-question-contact-2"]');

      expect(contact2component.find('[data-test-id="view-question-data-text-contact-name"]').text().trim()).toEqual(contact2['contact-name']);
      expect(contact2component.find('[data-test-id="view-question-data-text-department-name"]').text().trim()).toEqual(contact2['department-name']);
      expect(contact2component.find('[data-test-id="view-question-data-text-phone-number"]').text().trim()).toEqual(contact2['phone-number']);
      expect(contact2component.find('[data-test-id="view-question-data-text-email-address"]').text().trim()).toEqual(contact2['email-address']);
    });
  }));
});
