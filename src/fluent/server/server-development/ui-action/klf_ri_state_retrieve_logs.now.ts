import { UiAction } from '@servicenow/sdk/core'

UiAction({
    $id: Now.ID['07b891b4ffc6431020d2333663e972d4'],
    table: 'u_klf_recordimporter_state',
    name: 'Retrieve Logs',
    actionName: 'klf_retrieve_logs',
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
    condition: 'KLF_RecordImporter.showRetrieveLogs(current)',
    script: `KLF_RecordImporter.retrieveLogs(current);
action.setRedirectURL(current);`,
    showUpdate: true,
    showInsert: true,
})
