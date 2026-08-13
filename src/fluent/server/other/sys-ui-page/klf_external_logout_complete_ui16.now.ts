import { UiPage } from '@servicenow/sdk/core'

UiPage({
    $id: Now.ID['968ea7b09738c21024d7b066f053afc9'],
    category: 'general',
    endpoint: 'klf_external_logout_complete_ui16.do',
    html: `<?xml version="1.0" encoding="utf-8"?>
<!-- Used in External Authentication, where login page is absent. A static logout page here is used to prevent immediate 
  login upon logout action. -->
<j:jelly trim="true" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
  <g:evaluate>var errorMessages = gs.getSession().getProperty('klf.ExternalAuthentication.error_messages');
		if(errorMessages) {
		errorMessages.split(',').forEach(function(message) {
		gs.addErrorMessage('This is a test ' + message);
		});
		}</g:evaluate>
  <g:evaluate var="jvar_msg_info" object="true" expression="gs.getInfoMessages();"></g:evaluate>
  <g:evaluate var="jvar_msg_error" object="true" expression="gs.getErrorMessages();"></g:evaluate>
  <g:evaluate>gs.flushMessages();</g:evaluate>
  <style>.show {
			visibility: visible;
		}

		.hide {
			visibility: hidden;
		}</style>
  <!-- PRB1409274: For Mobile OIDC logout, we use external_logout_complete file present in glide-mobile project -->
  <g2:evaluate var="jvar_url" jelly="true">var title = gs.getMessage('Logout successful');
		var toggleTbl = "show";
		var esigLogout = gs.getSession().getHttpSession().getAttribute("isOIDCEsigLogoutFlow");
		gs.debug("Is Oidc Esig Logout request : "+ esigLogout);
		var url = '';
		var state = jelly.state;
		if(!GlideStringUtil.nil(state) $[AMP]$[AMP] state != undefined) {
		url = GlideStringUtil.base64Decode(state);
		gs.debug("State parameter value for logout redirection : "+ url);
		if (!SNC.AuthenticationHelper.isSafeURL(url)) {
		gs.debug("Not a safe url, redirecting to not_allowed.do");
		url = "/not_allowed.do";
		}
		url = SNC.AuthenticationHelper.removeJavaScriptStr(url);
		toggleTbl = "hide";
		}
		if (esigLogout) {
		gs.getSession().getHttpSession().setAttribute("isOIDCEsigLogoutFlow", null);
		url = "/esig_logout_complete.do?sysparm_nostack=true";
		toggleTbl = "hide";
		}
		gs.debug("Redirect URL value : "+ url);
		url;</g2:evaluate>
  <div data-form-title="$[title]"></div>
  <div class="outputmsg_div">
    <j:forEach var="jvar_value" indexVar="jvar_key" items="\${jvar_msg_info}">
      <div class="outputmsg outputmsg_info notification notification-info">\${jvar_value}</div>
    </j:forEach>
    <j:forEach var="jvar_value" indexVar="jvar_key" items="\${jvar_msg_error}">
      <div class="outputmsg outputmsg_error notification notification-error">\${jvar_value}</div>
    </j:forEach>
  </div>
  <table id="tbl" class="$[toggleTbl] wide" cellpadding="0" cellspacing="0" border="0">
    <tr class="header">
      <td>
        <table border="0" cellspacing="0" cellpadding="2">
          <tr class="header">
            <td width="100%">
              <div id="form_header" class="caption" style="margin-top: 2px;">\${gs.getMessage('Logout
								succeeded')}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div>
          <h3>\${gs.getMessage('Logout successful')}</h3>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div>\${gs.getMessage('You have successfully logged out.')}
          <br></br>
        </div>
      </td>
    </tr>
  </table>
  <j2:if test="$[!empty(jvar_url)]">
    <meta http-equiv="refresh" content="0;url=$[jvar_url]"></meta>
  </j2:if>
</j:jelly>`,
})
