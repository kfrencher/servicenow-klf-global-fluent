(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	const {scopeName, groupMapping} = request.body.data;

	if (!scopeName) {
		throw 'A scopeName is required';
	}

	if (!groupMapping) {
		throw 'A groupMapping is required';
	}
	
	gs.getUser().savePreference(scopeName, JSON.stringify(groupMapping, null, 4));

	return {success: true};

})(request, response);