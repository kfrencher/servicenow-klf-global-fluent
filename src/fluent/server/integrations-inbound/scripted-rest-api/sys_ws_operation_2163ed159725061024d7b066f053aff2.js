(function process(/*RESTAPIRequest (glide-rest.ScriptableServiceRequest) */ request, /*RESTAPIResponse*/ response) {
	// ScriptableServiceRequestBody
	var body = request.body;

	// GlideScriptableInputStream
	var xmlStream = body.dataStream;
	var reader = new GlideTextReader(xmlStream);
	
	// get first line
	// I'm using an Array to hold the lines because if you use one string you can run into a string size limit
	// ServiceNow limits the size of one string to 32MB. Using the Array allows me to hold the data in multiple
	// strings until I have to pass it to another method
	//
	// I also tried using XmlDocument2 to read the inputstream, but couldn't get it to read the input stream
	var xml = [];
	var line = reader.readLine();
	while(typeof line == 'string') {
		xml.push(line);
		line = reader.readLine();
	}

	if(xml.length > 0) {
		global.KLF_RecordSync.loadRecordByGlideUpdateManager2(xml.join('\n'));
		response.setStatus('200');
		response.setBody({
			success: true,
			message: 'Records processed'
		});
	} else {
		response.setStatus('400');
		response.setBody({
			success: false,
			message: 'An XML document is required in the request body'
		});
	}

// @ts-ignore
})(request, response);