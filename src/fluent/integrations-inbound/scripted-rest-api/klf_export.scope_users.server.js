(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	const emptyConnectionConfig = {
		instanceUrl: '',
		username: '',
		password: ''
	};

	const {scope} = request.body.data;

	const userUtils = new global.KLF_RecordSync_UserUtils(emptyConnectionConfig);
	const userSysIds = userUtils.getUniqueUsersInScope(scope);

	if(userSysIds.length > 0) {
		return userUtils.getRemoteUsersBySysIds(userSysIds);
	} else {
		return [];
	}
	

})(/** @type {RESTAPIRequest} */ (request), /** @type {RESTAPIResponse} */ (response));