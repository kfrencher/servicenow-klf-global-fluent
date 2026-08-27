(function executeRule(current, previous /*null when async*/) {

	g_scratchpad.scheduledJobList = global.KLF_RecordImporter.getScheduledJobList();
	global.KLF_RecordImporter.checkScheduledJobList(current);

})(current, previous);