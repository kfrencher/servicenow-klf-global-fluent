import { UiAction } from '@servicenow/sdk/core'

UiAction({
    $id: Now.ID['8f015ba797ace150b2e1f97e6253af49'],
    table: 'sys_atf_test',
    name: 'Add Steps From Test',
    actionName: 'klf_add_steps_from_test',
    form: {
        showButton: true,
    },
    client: {
        isClient: true,
        isUi11Compatible: true,
        onClick: 'showAddStepsFromTestModal()',
    },
    workspace: {
        clientScriptV2: `/**
 * @param {g_form} g_form 
 */
function onClick(g_form) {

}`,
    },
    messages: [],
    condition:
        "!((new GlideImpersonate()).isImpersonating()) && sn_atf.AutomatedTestingFramework.isRunnerEnabled() && current.active && GlideMobileExtensions.getDeviceType() == 'doctype'",
    script: `function showAddStepsFromTestModal() {
	// Rendering a modal dialog to retrieve the source of the test steps
	// The form will be submitted from the dialog code which can be found
	// in the UI Page
	var gm = new GlideModal('klf_add_steps_from_test_modal');
	
	gm.setTitle('Add steps from selected test');

	gm.setPreference('sysparm_to_test_sys_id', g_form.getUniqueValue());
	gm.setPreference('sysparm_sys_package', g_form.getValue('sys_package'));

	gm.setWidth(500);
	gm.render();	
}`,
    hint: 'Copies all the steps from the selected test and appends those steps to this test',
    showUpdate: true,
    showInsert: false,
})
