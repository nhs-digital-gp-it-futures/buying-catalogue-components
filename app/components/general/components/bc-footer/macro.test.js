import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcFooter',
    path: 'components/general/components/bc-footer/macro.njk',
  },
};

const footerLinks = [
  {
    label: 'Buyer\'s Guide',
    URL: '/guide',
  },
  {
    label: 'NHS Digital Helpdesk',
    URL: '/guide#contact-us',
  },
  {
    label: 'NHS Digital',
    URL: 'https://digital.nhs.uk/',
  },
  {
    label: 'About GP IT Futures',
    URL: 'https://digital.nhs.uk/services/future-gp-it-systems-and-services',
  },
  {
    label: 'Capabilities & Standards Model',
    URL: 'https://gpitbjss.atlassian.net/wiki/spaces/GPITF/overview',
  },
];

describe('bc-footer', () => {
  it('should render the footer panel with correct links', componentTester(setup, (harness) => {
    const context = { params: { footerLinks } };

    harness.request(context, ($) => {
      const footer = $('[data-test-id="footer"]');

      expect(footer.length).toEqual(1);

      footerLinks.map((link, i) => {
        expect(footer.find(`li:nth-child(${i + 1})`).text().trim()).toEqual(link.label);
      });
    });
  }));

  it('should render the footer legal panel if showLegalPanel is true', componentTester(setup, (harness) => {
    const context = { params: { showLegalPanel: true } };

    harness.request(context, ($) => {
      const footer = $('[data-test-id="footer"]');
      const legalPanel = footer.find('[data-test-id="legal-panel"]');
      expect(footer.length).toEqual(1);
      expect(legalPanel.length).toEqual(1);
      expect(legalPanel.find('li:nth-child(1)').text().trim()).toEqual('Legal');
      expect(legalPanel.find('li:nth-child(2)').text().trim()).toEqual('Privacy policy and cookies');
      expect(legalPanel.find('li:nth-child(2) > a').attr('href')).toEqual('/privacy-policy');
    });
  }));

  it('should not render the footer legal panel if showLegalPanel is false', componentTester(setup, (harness) => {
    const context = { params: { showLegalPanel: false } };

    harness.request(context, ($) => {
      const footer = $('[data-test-id="footer"]');
      const legalPanel = footer.find('[data-test-id="legal-panel"]');
      expect(footer.length).toEqual(1);
      expect(legalPanel.length).toEqual(0);
    });
  }));
});
