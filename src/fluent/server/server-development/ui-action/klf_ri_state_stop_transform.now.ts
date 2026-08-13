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
        clientScriptV2: `function onClick(g_form) {

}`,
    },
    messages: [],
    condition: 'KLF_RecordImporter.showStopTransform(current)',
    script: `KLF_RecordImporter.stopTransform(current);
action.setRedirectURL(current);`,
    showUpdate: true,
    showInsert: true,
})
