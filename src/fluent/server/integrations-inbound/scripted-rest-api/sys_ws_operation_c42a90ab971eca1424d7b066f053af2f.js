(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // ScriptableServiceRequestBody
	var body = request.body;

	// GlideScriptableInputStream
	var manifestJSON = body.dataString;

	var manifest = global.KLF_RecordSync.Manifest.createManifestFromJson(manifestJSON);
	var missingRecordsManifest = manifest.validate();
	
	response.setStatus('200');
	response.setBody(missingRecordsManifest.toObj());

// @ts-ignore
})(request, response);