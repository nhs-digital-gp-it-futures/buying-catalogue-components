import { componentTester } from '../../../../testUtils/componentTester';

const setup = {
  component: {
    name: 'bcTaskList',
    path: 'components/general/components/bc-task-list/macro.njk',
  },
};

const mockContext = {
  params: {
    taskList: [
      {
        taskName: 'Task 1',
        items: [
          { description: 'item 1 description', href: '/item/1', complete: true },
          { description: 'item 2 description' },
        ],
      },
      {
        taskName: 'Task 2',
        items: [
          { description: 'item 3 description' },
          { description: 'item 4 description', href: '/item/4', complete: true },
        ],
      },
    ],
  },
};

describe('task list', () => {
  it('should render the task list', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('[data-test-id="task-list"]').length).toEqual(1);
    });
  }));

  it('should render a numbered task name for each task', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('.bc-c-task-list__task').length).toEqual(2);
      expect($('h2[data-test-id="task-0-name"] span').text().trim()).toEqual('1.');
      expect($('h2[data-test-id="task-0-name"] div').text().trim()).toEqual(mockContext.params.taskList[0].taskName);
      expect($('h2[data-test-id="task-1-name"] span').text().trim()).toEqual('2.');
      expect($('h2[data-test-id="task-1-name"] div').text().trim()).toEqual(mockContext.params.taskList[1].taskName);
    });
  }));

  it('should render a list item for each item in items array', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('li[data-test-id="task-0"] li').length).toEqual(mockContext.params.taskList[0].items.length);
      expect($('li[data-test-id="task-1"] li').length).toEqual(mockContext.params.taskList[1].items.length);
    });
  }));

  it('should render a link if item in items array has href', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('li[data-test-id="task-0"] a[data-test-id="task-0-item-0-description"]').length).toEqual(1);
      expect($('li[data-test-id="task-0"] a[data-test-id="task-0-item-0-description"]').text().trim()).toEqual(mockContext.params.taskList[0].items[0].description);
      expect($('li[data-test-id="task-0"] a[data-test-id="task-0-item-1-description"]').length).toEqual(0);
      expect($('li[data-test-id="task-1"] a[data-test-id="task-1-item-0-description"]').length).toEqual(0);
      expect($('li[data-test-id="task-1"] a[data-test-id="task-1-item-1-description"]').length).toEqual(1);
      expect($('li[data-test-id="task-1"] a[data-test-id="task-1-item-1-description"]').text().trim()).toEqual(mockContext.params.taskList[1].items[1].description);
    });
  }));

  it('should render a div if item in items array has no href', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('li[data-test-id="task-0"] div[data-test-id="task-0-item-0-description"]').length).toEqual(0);
      expect($('li[data-test-id="task-0"] div[data-test-id="task-0-item-1-description"]').length).toEqual(1);
      expect($('li[data-test-id="task-0"] div[data-test-id="task-0-item-1-description"]').text().trim()).toEqual(mockContext.params.taskList[0].items[1].description);
      expect($('li[data-test-id="task-1"] div[data-test-id="task-1-item-0-description"]').length).toEqual(1);
      expect($('li[data-test-id="task-1"] div[data-test-id="task-1-item-0-description"]').text().trim()).toEqual(mockContext.params.taskList[1].items[0].description);
      expect($('li[data-test-id="task-1"] div[data-test-id="task-1-item-1-description"]').length).toEqual(0);
    });
  }));

  it('should render a complete tag if item in items array has complete key', componentTester(setup, (harness) => {
    harness.request(mockContext, ($) => {
      expect($('[data-test-id="task-0-item-0-complete-tag"]').length).toEqual(1);
      expect($('[data-test-id="task-0-item-0-complete-tag"]').text().trim()).toEqual('Complete');
      expect($('[data-test-id="task-0-item-1-complete-tag"]').length).toEqual(0);
      expect($('[data-test-id="task-1-item-0-complete-tag"]').length).toEqual(0);
      expect($('[data-test-id="task-1-item-1-complete-tag"]').length).toEqual(1);
      expect($('[data-test-id="task-1-item-1-complete-tag"]').text().trim()).toEqual('Complete');
    });
  }));
});
