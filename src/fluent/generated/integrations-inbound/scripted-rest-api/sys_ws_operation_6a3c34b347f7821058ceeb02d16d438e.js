// @ts-nocheck
/**
 * @todo This should probably be removed. I don't beelieve it's used anywhere.
 */
(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	var body = request.body;
    var bodyJSON = body.dataString;

    /** 
     * Refer to {@link global.KLF_RecordSync_RoleUtils.syncRoles}. That function generates
     * the request object that is expected here.
     * @type {RoleAssignedToData} 
     */
    var requestData = JSON.parse(bodyJSON);

    /** 
     * Refer to {@link global.KLF_RecordSync_RoleUtils.syncRoles}. That function generates
     * the request object that is expected here.
     * @type {AddRolesResponse} 
     */
    var result =
        global.KLF_RecordSync_GroupUtils.addRoles(requestData);

    response.setStatus('200');
    response.setBody(result);

// @ts-ignore
})(request, response);