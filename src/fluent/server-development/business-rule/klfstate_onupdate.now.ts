import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['3c254083ffbd831020d2333663e9725d'],
    name: 'KLFSTATE onUpdate',
    table: 'u_klf_recordimporter_state',
    when: 'before',
    action: ['update', 'insert'],
    filterCondition: 'u_scheduled_job_nameVALCHANGES^EQ',
    script: Now.include('./klfstate_onupdate.server.js'),
    $meta: {
        useEsLatest: true,
    },
})
