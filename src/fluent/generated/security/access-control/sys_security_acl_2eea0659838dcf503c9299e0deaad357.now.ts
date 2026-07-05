import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['2eea0659838dcf503c9299e0deaad357'],
    description: 'Default access control on u_klf_recordimporter_state',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'delete',
    roles: ['u_klf_recordimporter_state_user'],
    table: 'u_klf_recordimporter_state',
})
