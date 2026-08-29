import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['1aeac259838dcf503c9299e0deaad3f9'],
    description:
        'Allow create for records in u_klf_recordimporter_state, for users with role u_klf_recordimporter_state_user.',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'create',
    roles: ['u_klf_recordimporter_state_user'],
    table: 'u_klf_recordimporter_state',
})
