import { SPAngularProvider } from '@servicenow/sdk/core'

SPAngularProvider({
    $id: Now.ID['d6c7288ac4ba221020d2af62322a083e'],
    name: 'KLF_OAuthUtilService',
    type: 'service',
    script: `/**
 * @param {angular.IWindowService} $window 
 */
function KLF_OAuthUtilService($window) {
	return {
		/**
		 * This will initiate an OAuth Authorization flow using the provided OAuth Entity Profile. This code was copied from the "Get OAuth Token" UI Action that is on the "REST Message" table. It is the code that is used to retrieve a token when clicking the related UI Action
		 * 
		 * After the token is retrieved it is saved in the OAuth Credential [oauth_credential] table. Refer to
		 * {@link KLF_OAuthHelper} script include for more details on how to retrieve the token.
		 * 
		 * @param {string} requestorContext A name that is used to group the retrieved tokens under. This is typically a table name like sys_user
		 * @param {string} requestor Typically a sys_id from the table name provided in requestorContext
		 * @param {string} oauthEntityProfileSysId oauth_entity_profile.sys_id To use for the flow
		 */
		initiateAuthorizationCodeFlow: function (requestorContext, requestor, oauthEntityProfileSysId) {
			var oauthInitiatorUrl = '/oauth_initiator.do' +
				'?oauth_requestor_context=' + requestorContext +
				'&oauth_requestor=' + requestor +
				'&oauth_provider_profile=' + oauthEntityProfileSysId +
				'&response_type=code';
			$window.open(oauthInitiatorUrl);
		}
	};
}`,
})
