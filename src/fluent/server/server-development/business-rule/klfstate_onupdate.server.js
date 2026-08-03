(function executeRule(current, previous /*null when async*/) {

	if(current.u_name.nil() && !current.u_scheduled_job_name.nil()) {
		const jobList = global.KLF_RecordImporter.getScheduledJobList();
		if(!jobList) {
			return;
		}
		const scheduledJobName = current.getValue('u_scheduled_job_name');
		const job = jobList.find(job => job.scheduledImportName == scheduledJobName);
		if(!job) {
			return;
		}
		current.u_name = global.KLF_RecordImporter.calculateCheckpointKey(job.scopeName);
	}
	

})(current, previous);