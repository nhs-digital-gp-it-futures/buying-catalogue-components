export const createMarketingDashboardContext = (dashboardManifest, marketingData) => {
  const context = {};
  const sections = [];

  dashboardManifest.sections.map((manifestSection) => {
    const section = {};
    const tasks = [];

    section.id = manifestSection.id;
    section.title = manifestSection.title;

    manifestSection.tasks.map((manifestTask) => {
      const task = {};
      task.URL = manifestTask.id;
      task.title = manifestTask.title;
      task.requirement = manifestTask.requirement;

      const { status } = marketingData.tasks
        .find(marketingDataTask => marketingDataTask.id === manifestTask.id);
      task.status = status;

      tasks.push(task);
    });

    section.tasks = tasks;
    sections.push(section);
  });

  context.sections = sections;

  return context;
};