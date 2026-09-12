(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // ScriptableServiceRequestBody
    var body = request.body;
    var bodyJSON = body.dataString;

    // Groups object should contain list of sys_user_group.sys_id that need to be mapped
    // to local groups
    /** @type {KLF_RecordSync_RemoteGroup[]} */
    var groups = JSON.parse(bodyJSON);
    var groupMapping = global.KLF_RecordSync_GroupUtils.createMappingFromRemote(groups);

    response.setStatus(200);
    response.setBody(groupMapping);

})(/** @type {RESTAPIRequest} */ (request), /** @type {RESTAPIResponse} */ (response));