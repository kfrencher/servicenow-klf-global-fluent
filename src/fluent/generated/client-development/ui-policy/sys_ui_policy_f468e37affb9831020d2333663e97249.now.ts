import { UiPolicy } from '@servicenow/sdk/core'

UiPolicy({
    $id: Now.ID['f468e37affb9831020d2333663e97249'],
    table: 'u_klf_recordimporter_state',
    shortDescription: 'KLFSTATE Scheduled Job Name Readonly',
    isolateScript: true,
    conditions: 'u_scheduled_job_name!=^EQ',
    actions: [
        {
            field: 'u_scheduled_job_name',
            readOnly: true,
            table: 'u_klf_recordimporter_state',
        },
    ],
})
