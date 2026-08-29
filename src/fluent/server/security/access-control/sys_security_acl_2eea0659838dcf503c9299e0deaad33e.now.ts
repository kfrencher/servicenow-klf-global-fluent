import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['2eea0659838dcf503c9299e0deaad33e'],
    description:
        'Allow read for records in u_klf_recordimporter_state, for users with role u_klf_recordimporter_state_user.',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'read',
    roles: ['u_klf_recordimporter_state_user'],
    table: 'u_klf_recordimporter_state',
})
