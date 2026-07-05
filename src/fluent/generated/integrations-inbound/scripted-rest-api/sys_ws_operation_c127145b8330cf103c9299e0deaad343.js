(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	const emptyConnectionConfig = {
		instanceUrl: '',
		username: '',
		password: ''
	};

	const {scope} = request.body.data;

	const groupUtils = new global.KLF_RecordSync_GroupUtils(emptyConnectionConfig);
	const groupSysIds = groupUtils.getUniqueGroupsInScope(scope);

	if(groupSysIds.length > 0) {
		return groupUtils.getRemoteGroupsBySysIds(groupSysIds);
	} else {
		return [];
	}
	

})(request, response);