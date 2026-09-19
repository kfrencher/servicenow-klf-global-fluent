(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	const {scopeName} = request.body.data;

	if (!scopeName) {
		throw 'A scopeName is required';
	}

	return {success: true, mapping: gs.getUser().getPreference(scopeName)};

})(/** @type {RESTAPIRequest} */ (request), /** @type {RESTAPIResponse} */ (response));