import { UiAction } from '@servicenow/sdk/core'

UiAction({
    $id: Now.ID['63b2554eff4e8b1020d2333663e97235'],
    table: 'u_klf_recordimporter_state',
    name: 'Save',
    actionName: 'sysverb_update',
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
    condition: Now.include('klf_ri_state_save.condition.server.js'),
    script: Now.include('klf_ri_state_save.script.server.js'),
    showUpdate: true,
    showInsert: true,
    $meta: {
        useEsLatest: true,
    },
})
