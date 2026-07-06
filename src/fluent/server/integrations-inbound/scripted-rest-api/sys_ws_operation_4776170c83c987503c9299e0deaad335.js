(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	const {scopeName, userMapping} = request.body.data;

	if (!scopeName) {
		throw 'A scopeName is required';
	}

	if (!userMapping) {
		throw 'A userMapping is required';
	}
	
	gs.getUser().savePreference(scopeName, JSON.stringify(userMapping, null, 4));

	return {success: true};

})(request, response);