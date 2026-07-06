(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	const emptyConnectionConfig = {
		instanceUrl: '',
		username: '',
		password: ''
	};

	const {tableName, filter} = request.body.data;

	const userUtils = new global.KLF_RecordSync_UserUtils(emptyConnectionConfig);
	const userSysIds = userUtils.getUniqueGroupsInTable(tableName, filter);

	if(userSysIds.length > 0) {
		return userUtils.getRemoteUsersBySysIds(userSysIds);
	} else {
		return [];
	}
	

})(request, response);