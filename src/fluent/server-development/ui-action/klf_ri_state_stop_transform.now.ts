import { UiAction } from '@servicenow/sdk/core'

UiAction({
    $id: Now.ID['1a9235fbff754b1020d2333663e97206'],
    table: 'u_klf_recordimporter_state',
    name: 'Stop Transform',
    actionName: 'klf_stop_transform',
    form: {
        showButton: true,
    },
    client: {
        isUi11Compatible: true,
    },
    workspace: {
        clientScriptV2: '',
    },
    messages: [],
    condition: Now.include('klf_ri_state_stop_transform.condition.server.js'),
    script: Now.include('klf_ri_state_stop_transform.script.server.js'),
    showUpdate: true,
    showInsert: true,
    $meta: {
        useEsLatest: true,
    },
})
