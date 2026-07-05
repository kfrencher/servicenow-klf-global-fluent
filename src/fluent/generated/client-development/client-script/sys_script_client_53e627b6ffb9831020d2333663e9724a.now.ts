import { ClientScript } from '@servicenow/sdk/core'

ClientScript({
    $id: Now.ID['53e627b6ffb9831020d2333663e9724a'],
    type: 'onLoad',
    table: 'u_klf_recordimporter_state',
    isolateScript: true,
    script: Now.include('./sys_script_client_53e627b6ffb9831020d2333663e9724a.client.js'),
    name: 'KLFSTATE onLoad',
})
