import { UiAction } from '@servicenow/sdk/core'

UiAction({
    $id: Now.ID['773f223a9339479082e3fd8eb903d675'],
    table: 'u_klf_recordimporter_state',
    name: 'Execute Job',
    actionName: 'klf_execute_job',
    form: {
        showButton: true,
    },
    client: {
        isUi11Compatible: true,
    },
    workspace: {
        clientScriptV2: `function onClick(g_form) {

}`,
    },
    messages: [],
    condition: 'KLF_RecordImporter.showExecuteJob(current)',
    script: `current.update();
KLF_RecordImporter.executeJob(current);
action.setRedirectURL(current);`,
    showUpdate: true,
    showInsert: true,
})
