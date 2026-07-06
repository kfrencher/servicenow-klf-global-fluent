import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['26ea0659838dcf503c9299e0deaad34b'],
    description: 'Default access control on u_klf_recordimporter_state',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'write',
    roles: ['u_klf_recordimporter_state_user'],
    table: 'u_klf_recordimporter_state',
})
