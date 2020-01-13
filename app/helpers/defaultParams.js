export default {
  tag: {
    componentName: 'tag',
    params: {
      dataTestId: 'example',
      text: 'Example Tag',
      classes: 'example-class',
    },
  },
  'view-data-bulletlist': {
    componentName: 'viewDataBulletlist',
    params: {
      dataTestId: 'some-test-identifier',
      data: ['first data', 'second data', 'third data'],
      classes: 'another-class',
    },
  },
  'view-data-link': {
    componentName: 'viewDataLink',
    params: {
      data: 'http://www.somelink.com',
      classes: 'another-class',
    },
  },
  'view-data-text': {
    componentName: 'viewDataText',
    params: {
      data: 'Some data',
      classes: 'another-class',
    },
  },
  'view-data-title': {
    componentName: 'viewDataTitle',
    params: {
      title: 'Title',
      classes: 'another-class',
    },
  },
  'view-expandable-section': {
    componentName: 'viewExpandableSection',
    params: {
      sectionId: 'some-section-id',
      sectionTitle: 'Some section title',
      innerComponent: '&ltdiv&gt;Some inner component&lt/div&gt;',
    },
  },
  'view-section-heading': {
    componentName: 'viewSectionHeading',
    params: {
      text: 'Example section heading',
    },
  },
  'view-section-table-row': {
    componentName: 'viewSectionTableRow',
    params: {
      questionId: 'some-question-id',
      questionTitle: 'Some question title',
      layout: 'vertical',
      innerComponent: '&ltdiv&gt;Some inner component&lt/div&gt;',
    },
  },
};
