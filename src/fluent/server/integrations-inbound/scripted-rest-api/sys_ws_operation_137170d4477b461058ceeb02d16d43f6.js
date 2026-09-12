(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // ScriptableServiceRequestBody
    var body = request.body;
    var bodyJSON = body.dataString;

    // Users object should contain list of sys_user.sys_id that need to be mapped
    // to local users
    /** @type {KLF_RecordSync_RemoteUser[]} */
    var users = JSON.parse(bodyJSON);
    var userMapping = global.KLF_RecordSync_UserUtils.createMappingFromRemote(users);

    response.setStatus(200);
    response.setBody(userMapping);

})(/** @type {RESTAPIRequest} */ (request), /** @type {RESTAPIResponse} */ (response));