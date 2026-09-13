import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['26ea0659838dcf503c9299e0deaad34b'],
    description:
        'Allow write for records in u_klf_recordimporter_state, for users with role u_klf_recordimporter_state_user.',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'write',
    roles: ['u_klf_recordimporter_state_user'],
    table: 'u_klf_recordimporter_state',
})
