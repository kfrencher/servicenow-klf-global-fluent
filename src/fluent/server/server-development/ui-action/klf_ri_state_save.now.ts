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
        clientScriptV2: `function onClick(g_form) {

}`,
    },
    messages: [],
    condition: 'KLF_RecordImporter.showSave(current)',
    script: `KLF_RecordImporter.save(current);
action.setRedirectURL(current);`,
    showUpdate: true,
    showInsert: true,
    $meta: {
        useEsLatest: true,
    },
})
