import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['2eea0659838dcf503c9299e0deaad33e'],
    description: 'Default access control on u_klf_recordimporter_state',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'read',
    roles: ['u_klf_recordimporter_state_user'],
    table: 'u_klf_recordimporter_state',
})
