import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['2eea0659838dcf503c9299e0deaad357'],
    description:
        'Allow delete for records in u_klf_recordimporter_state, for users with role u_klf_recordimporter_state_user.',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'delete',
    roles: ['u_klf_recordimporter_state_user'],
    table: 'u_klf_recordimporter_state',
})
