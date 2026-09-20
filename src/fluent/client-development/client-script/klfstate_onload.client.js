function onLoad() {
  const scheduledJobList = g_scratchpad.scheduledJobList;
  if (scheduledJobList && scheduledJobList.length > 0) {
    scheduledJobList.forEach(
      /** @type {(scheduledJob: { scheduledImportName: string }) => void} */ (scheduledJob) => {
        g_form.addOption('u_scheduled_job_name', scheduledJob.scheduledImportName, scheduledJob.scheduledImportName);
      },
    );
  }
}
