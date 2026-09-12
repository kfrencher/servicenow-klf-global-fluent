(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    const requestBody = request.body.data;
	response.setBody(new global.KLF_RecordExporter().exportTable(requestBody));

})(/** @type {RESTAPIRequest} */ (request), /** @type {RESTAPIResponse} */ (response));