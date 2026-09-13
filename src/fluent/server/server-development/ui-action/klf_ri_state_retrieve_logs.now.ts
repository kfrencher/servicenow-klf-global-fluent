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
    condition: Now.include('klf_ri_state_retrieve_logs.condition.server.js'),
    script: Now.include('klf_ri_state_retrieve_logs.script.server.js'),
    showUpdate: true,
    showInsert: true,
    $meta: {
        useEsLatest: true,
    },
})
