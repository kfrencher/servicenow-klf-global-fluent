import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'u_klf_recordimporter_state',
    view: default_view,
    columns: ['u_name', 'u_scheduled_job_name', 'u_state'],
})
