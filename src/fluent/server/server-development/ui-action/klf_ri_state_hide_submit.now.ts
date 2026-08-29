import { UiAction } from '@servicenow/sdk/core'

UiAction({
    $id: Now.ID['a3125dcaff4e8b1020d2333663e972bc'],
    table: 'u_klf_recordimporter_state',
    name: 'Hide Submit',
    actionName: 'sysverb_insert',
    client: {
        isUi11Compatible: true,
    },
    workspace: {
        clientScriptV2: `function onClick(g_form) {

}`,
    },
    messages: [],
    showUpdate: true,
    showInsert: true,
    $meta: {
        useEsLatest: true,
    },
})
