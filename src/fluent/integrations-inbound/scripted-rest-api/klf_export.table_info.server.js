(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	const data = request.body.data;

	if (!Array.isArray(data)) {
		throw 'Request must contain a list of ExportTableOptions';
	}

	response.setBody(new global.KLF_RecordExporter().getTableInfo(data));

})(/** @type {RESTAPIRequest} */ (request), /** @type {RESTAPIResponse} */ (response));