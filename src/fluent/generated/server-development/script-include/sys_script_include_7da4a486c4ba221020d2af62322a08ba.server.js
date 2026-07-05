class KLF_OAuthHelper {
    /**
     * These parameters are needed to lookup the specific OAuth Requestor Profile [oauth_requestor_profile].
     * The oauth_requestor_profile is needed to lookup tokens in the OAuth Credential [oauth_credential] table.
     * The OAuth Credential table is where OAuth tokens are stored after ServiceNow executes an OAuth flow.
     * 
     * These values are provided when the OAuth token is initially retrieved. Typically using the oauth_initiator API. For more information look at "OAuth Outbound" in the ServiceNow documentation.
     * 
     * You can find an example of initiating an OAuth flow in the "Get OAuth Token" UI Action that is on the "REST Message" table
     * 
     * @param {string} requestorContext oauth_requestor_profile.requestor_context
     * @param {string} requestorSysId oauth_requestor_profile.requestor_id
     * @param {string} oauthEntityProfileSysId oauth_requestor_profile.oauth_entity_profile
     * @param {number} [minimumTokenExpirationInSeconds=28800] If the token expires in less than this amount of time then the call to {KLF_OAuthHelper.getToken} will return null even if the token exists. The default is 8 hours
     */
    constructor(requestorContext, requestorSysId, oauthEntityProfileSysId, minimumTokenExpirationInSeconds = 28800) {
        this.requestorContext = requestorContext;
        this.requestorSysId = requestorSysId;
        this.oauthEntityProfileSysId = oauthEntityProfileSysId;
        this.minimumTokenExpirationInSeconds = minimumTokenExpirationInSeconds;
    }

    /**
     * Returns an object that can be used to retrieve a token from OAuth Credentials [oauth_credential] or can
     * be used to initiate a flow using "oauth_initiator"
     * @returns {{
     * requestorContext: string,
     * requestorSysId: string,
     * oauthEntityProfileSysId: string,
     * hasAccessToken: boolean
     * }}
     */
    getTokenInfo() {
        return {
            requestorContext: this.requestorContext,
            requestorSysId: this.requestorSysId,
            oauthEntityProfileSysId: this.oauthEntityProfileSysId,
            hasAccessToken: this.hasAccessToken()
        };
    }

    /**
     * Returns true if access token exists and the token expiration is far enough in the future
     * @returns {boolean}
     */
    hasAccessToken() {
        return !!this.getAccessToken();
    }

    /**
     * @returns {string?} Returns the base64 encoded access token if one exists and is far enough in the future. Elses returns null
     */
    getAccessToken() {
        var oAuthClient = new sn_auth.GlideOAuthClient();
        var glideToken = oAuthClient.getToken(this.requestorSysId, this.oauthEntityProfileSysId);
        if (glideToken) {
            var expiresIn = glideToken.getExpiresIn();
            if (expiresIn > this.minimumTokenExpirationInSeconds) {
                return glideToken.getAccessToken();
            }
        }
        return null;
    }
}