import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['0e85a3f2ffb9831020d2333663e97209'],
    name: 'KLFSTATE onDisplay',
    table: 'u_klf_recordimporter_state',
    when: 'display',
    action: [],
    script: Now.include('./sys_script_0e85a3f2ffb9831020d2333663e97209.server.js'),
})
