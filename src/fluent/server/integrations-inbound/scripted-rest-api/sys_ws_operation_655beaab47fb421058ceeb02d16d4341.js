// @ts-nocheck
/**
 * @todo This should probably be removed. I don't believe it's used anywhere.
 */
(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	var roleNameString = request.queryParams.roleNames;
	if(!roleNameString) {
		response.setStatus('400');
		response.setBody(JSON.stringify({
			success:false,
			error: 'roleNames query parameter is required'
		}));
	}

	var roleNames = roleNameString.split(',');

    /** 
     * Refer to {@link global.KLF_RecordSync_RoleUtils.getRemoteRoleAssignedTo}. That function generates
     * the request object that is expected here.
     * @type {{roleNames:string[]}} 
     */
    var result =
        global.KLF_RecordSync_GroupUtils.getRemoteRoleAssignedTo(roleNames);

    response.setStatus('200');
    response.setBody(result);

// @ts-ignore
})(request, response);