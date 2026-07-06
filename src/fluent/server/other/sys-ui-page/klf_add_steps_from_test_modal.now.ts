import { UiPage } from '@servicenow/sdk/core'

UiPage({
    $id: Now.ID['706c176797ece150b2e1f97e6253af97'],
    category: 'general',
    endpoint: 'klf_add_steps_from_test_modal.do',
    html: `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
	<g:ui_form>
		<input type="hidden" name="sys_package" value="\${sysparm_sys_package}"/>
		<input type="hidden" name="test_target_sys_id" value="\${sysparm_to_test_sys_id}"/>
		<p>Select test to add steps from</p>
		<div style="margin: 15px 0">
			<!-- 
				Constrain to tests in the current application scope and exclude the current test from the list 
				Only show tests with names that start with template
				Order by name
			-->
			<g:macro_invoke macro="ui_reference" name="test_source_sys_id" 
							table="sys_atf_test" show_popup="true" 
							show_lookup="true" 
							query="sys_package=\${sysparm_sys_package}^sys_id!=\${sysparm_to_test_sys_id}^u_template=true^ORDERBYname"/>
		</div>
		<g:dialog_buttons_ok_cancel ok="return true" />
	</g:ui_form>
</j:jelly>`,
    processingScript: `if(sys_package != gs.getCurrentApplicationId()) {
	gs.addErrorMessage('You must be in the same scope as the test to add steps');
} else {
	var TestUtils = global.KLF_AtfAddStepsHelper;
	var fromTest = TestUtils.getTest(test_source_sys_id);
	if(!fromTest) {
		gs.addErrorMessage('Could not find test source to copy steps from using sys_id: ' + test_source_sys_id);
	}
	var toTest = TestUtils.getTest(test_target_sys_id);
	if(!toTest) {
		gs.addErrorMessage('Could not find test target to copy steps to using sys_id: ' + test_target_sys_id);
	}

	TestUtils.addTestSteps(test_source_sys_id, test_target_sys_id);

	gs.addInfoMessage('Added steps from: ' + fromTest.getDisplayValue() + ' to ' + toTest.getDisplayValue());
}

var urlOnStack = GlideSession.get().getStack().bottom();
response.sendRedirect(urlOnStack);`,
})
