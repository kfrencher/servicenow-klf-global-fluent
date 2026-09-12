(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // Responsible for removing any test data added by KLF_RecordSyncTest
	var task = new GlideRecord('task');
	task.addQuery('short_description', 'CONTAINS', 'KLF_RecordSyncTest');
	task.query();
	task.deleteMultiple();

	var group = new GlideRecord('sys_user_group');
	group.addQuery('name', 'CONTAINS', 'KLF_RecordSyncTest');
	group.query();
	group.deleteMultiple();

	response.setBody({
		success: true
	});
})(/** @type {RESTAPIRequest} */ (request), /** @type {RESTAPIResponse} */ (response));