import { UiPage } from '@servicenow/sdk/core'

UiPage({
    $id: Now.ID['896ee3b09738c21024d7b066f053af17'],
    category: 'general',
    endpoint: 'klf_external_logout_complete_polaris.do',
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
  <!-- Box override via margin because the frame has padding baked in -->
  <div class="login-wrapper" style="margin: -5px;">
    <g:inline template="polarisberg_login_wrapper_svg.xml"></g:inline>
    <div class="login-container">
      <div class="outputmsg_div">
        <j:forEach var="jvar_value" indexVar="jvar_key" items="\${jvar_msg_info}">
          <div class="outputmsg outputmsg_info notification notification-info">\${jvar_value}</div>
        </j:forEach>
        <j:forEach var="jvar_value" indexVar="jvar_key" items="\${jvar_msg_error}">
          <div class="outputmsg outputmsg_error notification notification-error">\${jvar_value}</div>
        </j:forEach>
      </div>
      <div class="login-logo">
        <g:inline template="polarisberg_login_logo.xml"></g:inline>
      </div>
      <div class="login-card \${jvar_hide_illustrations}">
        <g:inline template="polarisberg_login_card_svg.xml"></g:inline>
        <div class="login-form">
          <h1>\${gs.getMessage('Logout successful')}</h1>
          <h2>\${gs.getMessage('You have successfully logged out.')}</h2>
        </div>
      </div>
    </div>
  </div>
  <j2:if test="$[!empty(jvar_url)]">
    <meta http-equiv="refresh" content="0;url=$[jvar_url]"></meta>
  </j2:if>
</j:jelly>`,
})
