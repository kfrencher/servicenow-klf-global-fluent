(function executeRule(current, previous /*null when async*/) {

	if(current.u_name.nil() && !current.u_scheduled_job_name.nil()) {
		const jobList = KLF_RecordImporter.getScheduledJobList();
		const scheduledJobName = current.getValue('u_scheduled_job_name');
		const job = jobList.find(job => job.scheduledImportName == scheduledJobName);
		current.u_name = KLF_RecordImporter.calculateCheckpointKey(job.scopeName);
	}
	

})(current, previous);