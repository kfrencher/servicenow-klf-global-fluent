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
        clientScriptV2: '',
    },
    messages: [],
    condition: Now.include('execute_job.condition.server.js'),
    script: Now.include('execute_job.script.server.js'),
    showUpdate: true,
    showInsert: true,
    $meta: {
        useEsLatest: true,
    },
})
