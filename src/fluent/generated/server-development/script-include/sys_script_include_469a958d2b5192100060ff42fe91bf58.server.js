var global = global || {};

/**
 * Creates a mock RESTAPIRequest object for testing purposes.
 * @constructor
 * @param {Object} config - Configuration object for the mock request.
 * @param {string} [config.url='https://example.com/api/endpoint'] - The full URL of the request.
 * @param {string} [config.uri='/api/endpoint'] - The URI part of the URL.
 * @param {string} [config.queryString=''] - The query string part of the URL.
 * @param {Object} [config.body] - The request body.
 */
global.KLF_TestMockRESTAPIRequest = function(config) {
    config = config || {};
    this.url = config.url || 'https://example.com/api/endpoint';
    this.uri = config.uri || '/api/endpoint';
    this.queryString = config.queryString || '';
    this.body = config.body || new global.KLF_TestMockRESTAPIRequest.MockRESTAPIRequestBody();
    /** @type {{[key:string]:string}} */
    this.headers = {};
    /** @type {{[key:string]:string}} */
    this.queryParams = {};
    this.parseQueryString();
};

/**
 * Gets the value of the specified header.
 * @param {string} headerName - The name of the header.
 * @returns {string} The value of the header, or an empty string if not found.
 */
global.KLF_TestMockRESTAPIRequest.prototype.getHeader = function(headerName) {
    return this.headers[headerName] || '';
};

/**
 * Gets the list of supported response content types.
 * @returns {string[]} An array of supported content types.
 */
global.KLF_TestMockRESTAPIRequest.prototype.getSupportedResponseContentTypes = function() {
    return ['application/json', 'application/xml', 'text/plain'];
};

/**
 * Gets the requested query category from the query parameters.
 * @returns {string} The value of the 'sysparm_query_category' parameter, or an empty string if not found.
 */
global.KLF_TestMockRESTAPIRequest.prototype.getRequestedQueryCategory = function() {
    return this.queryParams['sysparm_query_category'] || '';
};

/**
 * Sets a header value.
 * @param {string} headerName - The name of the header.
 * @param {string} headerValue - The value of the header.
 */
global.KLF_TestMockRESTAPIRequest.prototype.setHeader = function(headerName, headerValue) {
    this.headers[headerName] = headerValue;
};

/**
 * Sets the query string and parses it.
 * @param {string} queryString - The query string to set.
 */
global.KLF_TestMockRESTAPIRequest.prototype.setQueryString = function(queryString) {
    this.queryString = queryString;
    this.parseQueryString();
};

/**
 * Parses the query string into key-value pairs.
 */
global.KLF_TestMockRESTAPIRequest.prototype.parseQueryString = function() {
    this.queryParams = {};
    if (this.queryString) {
        var pairs = this.queryString.split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1] || '');
            this.queryParams[key] = value;
        }
    }
};

/**
 * Creates a mock RESTAPIRequestBody object for testing purposes.
 * @constructor
 * @param {string} [dataString='{"key": "value"}'] - The JSON string representing the body data.
 * @param {Object} [dataStream=null] - The data stream object (not implemented in this mock).
 */
global.KLF_TestMockRESTAPIRequest.MockRESTAPIRequestBody = function(dataString, dataStream) {
    this.dataString = dataString || '{"key": "value"}';
    this.dataStream = dataStream || null;
    /** @type {any} */
    this.jsonData = null;
    this.currentIndex = 0;
};

/**
 * Gets the next entry from the body data.
 * @returns {Object|null} The next entry, or null if there are no more entries.
 */
global.KLF_TestMockRESTAPIRequest.MockRESTAPIRequestBody.prototype.nextEntry = function() {
    if (!this.jsonData) {
        this.jsonData = JSON.parse(this.dataString);
    }

    if (Array.isArray(this.jsonData)) {
        if (this.currentIndex < this.jsonData.length) {
            return this.jsonData[this.currentIndex++];
        }
    } else {
        if (this.currentIndex === 0) {
            this.currentIndex++;
            return this.jsonData;
        }
    }

    return null;
};

/**
 * Checks if there are more entries in the body data.
 * @returns {boolean} True if there are more entries, false otherwise.
 */
global.KLF_TestMockRESTAPIRequest.MockRESTAPIRequestBody.prototype.hasNext = function() {
    if (!this.jsonData) {
        this.jsonData = JSON.parse(this.dataString);
    }

    if (Array.isArray(this.jsonData)) {
        return this.currentIndex < this.jsonData.length;
    } else {
        return this.currentIndex === 0;
    }
};