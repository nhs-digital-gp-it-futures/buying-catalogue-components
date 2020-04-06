import { createTestHarness } from '../../../testUtils/testHarness';

const setup = {
  templateName: 'viewEpicList',
  templateType: 'component',
  componentType: 'view',
};

describe('view-epic-list', () => {
  describe('when type is "met"', () => {
    it('should render the data when provided', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: [
            {
              id: 'C14E1',
              name: 'access prescribable items',
            },
            {
              id: 'C14E2',
              name: 'manage Formularies',
            },
            {
              id: 'C14E13',
              name: 'access Patient Record',
            },
          ],
          type: 'met',
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="some-data-identifier"] ul').length).toEqual(1);
        expect($('[data-test-id="some-data-identifier"] li').length).toEqual(3);
      });
    }));

    it('should not render the data when not provided', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: [],
          type: 'met',
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="some-data-identifier"]').length).toEqual(0);
      });
    }));

    it('should render the tick icon for met types', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: [
            {
              id: 'C14E1',
              name: 'access prescribable items',
            },
          ],
          type: 'met',
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="some-data-identifier"] ul li svg').hasClass('nhsuk-icon')).toEqual(true);
        expect($('[data-test-id="some-data-identifier"] ul li svg').hasClass('nhsuk-icon__tick')).toEqual(true);
      });
    }));
  });

  describe('when type is "not-met"', () => {
    it('should render the data when provided', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: [
            {
              id: 'C14E1',
              name: 'access prescribable items',
            },
            {
              id: 'C14E2',
              name: 'manage Formularies',
            },
            {
              id: 'C14E13',
              name: 'access Patient Record',
            },
          ],
          type: 'not-met',
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="some-data-identifier"] ul').length).toEqual(1);
        expect($('[data-test-id="some-data-identifier"] li').length).toEqual(3);
      });
    }));

    it('should not render the data when not provided', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: [],
          type: 'not-met',
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="some-data-identifier"]').length).toEqual(0);
      });
    }));

    it('should render the cross icon for not-met types', createTestHarness(setup, (harness) => {
      const context = {
        params: {
          dataTestId: 'some-data-identifier',
          data: [
            {
              id: 'C14E1',
              name: 'access prescribable items',
            },
          ],
          type: 'not-met',
        },
      };

      harness.request(context, ($) => {
        expect($('[data-test-id="some-data-identifier"] ul li svg').hasClass('nhsuk-icon')).toEqual(true);
        expect($('[data-test-id="some-data-identifier"] ul li svg').hasClass('nhsuk-icon__cross')).toEqual(true);
      });
    }));
  });

  it('should not render the data when no type provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          {
            id: 'C14E1',
            name: 'access prescribable items',
          },
        ],
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"]').length).toEqual(0);
    });
  }));

  it('should not render the data when invalid type provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          {
            id: 'C14E1',
            name: 'access prescribable items',
          },
        ],
        type: 'invalid',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"]').length).toEqual(0);
    });
  }));

  it('should not render the data when not provided', createTestHarness(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"]').length).toEqual(0);
    });
  }));

  it('should render the epic name and id', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          {
            id: 'C14E1',
            name: 'access prescribable items',
          },
        ],
        type: 'met',
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="some-data-identifier"] ul li span').text().trim()).toEqual('access prescribable items (C14E1)');
    });
  }));

  it('should add classes provided within the params', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        dataTestId: 'some-data-identifier',
        data: [
          {
            id: 'C14E1',
            name: 'access prescribable items',
          },
        ],
        type: 'met',
        classes: 'new-class another-class',
      },
    };

    harness.request(context, ($) => {
      expect($('div[data-test-id="some-data-identifier"]').hasClass('bc-c-epic-list')).toEqual(true);
      expect($('div[data-test-id="some-data-identifier"]').hasClass('new-class')).toEqual(true);
      expect($('div[data-test-id="some-data-identifier"]').hasClass('another-class')).toEqual(true);
    });
  }));
});
