(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var body = request.body;
    var bodyJSON = body.dataString;

    /** 
     * Refer to {@link global.KLF_RecordSync_GroupUtils.updateRemoteNotifications}. That function generates
     * the request object that is expected here.
     * @type {KLF_RecordSync_UpdateRemoteNotificationsRequest} 
     */
    var updateNotificationsRequest = JSON.parse(bodyJSON);
    var result =
        global.KLF_RecordSync_GroupUtils.updateNotifications(updateNotificationsRequest.groupMapping, updateNotificationsRequest.notificationSysIds);

    response.setStatus(200);
    response.setBody(result);

})(/** @type {RESTAPIRequest} */ (request), /** @type {RESTAPIResponse} */ (response));