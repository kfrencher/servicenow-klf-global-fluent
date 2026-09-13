import { UiAction } from '@servicenow/sdk/core'

UiAction({
    $id: Now.ID['43b9693bff354b1020d2333663e972ed'],
    table: 'u_klf_recordimporter_state',
    name: 'Stop Data Load',
    actionName: 'klf_stop_data_load',
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
    condition: Now.include('klf_ri_state_stop_data_load.condition.server.js'),
    script: Now.include('klf_ri_state_stop_data_load.script.server.js'),
    showUpdate: true,
    showInsert: true,
    $meta: {
        useEsLatest: true,
    },
})
