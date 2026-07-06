import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['916dcce5838d03903c9299e0deaad32d'],
    name: 'onLoadedDataJsonUpdated',
    table: 'u_klf_recordimporter_state',
    when: 'before',
    action: ['update', 'insert'],
    script: Now.include('./onloadeddatajsonupdated.server.js'),
})
