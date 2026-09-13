(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	const emptyConnectionConfig = {
		instanceUrl: '',
		username: '',
		password: ''
	};

	const {tableName, filter} = request.body.data;

	const groupUtils = new global.KLF_RecordSync_GroupUtils(emptyConnectionConfig);
	const groupSysIds = groupUtils.getUniqueGroupsInTable(tableName, filter);

	if(groupSysIds.length > 0) {
		return groupUtils.getRemoteGroupsBySysIds(groupSysIds);
	} else {
		return [];
	}
	

})(/** @type {RESTAPIRequest} */ (request), /** @type {RESTAPIResponse} */ (response));