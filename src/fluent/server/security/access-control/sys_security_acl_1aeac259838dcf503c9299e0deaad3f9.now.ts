import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['1aeac259838dcf503c9299e0deaad3f9'],
    description: 'Default access control on u_klf_recordimporter_state',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'create',
    roles: ['u_klf_recordimporter_state_user'],
    table: 'u_klf_recordimporter_state',
})
