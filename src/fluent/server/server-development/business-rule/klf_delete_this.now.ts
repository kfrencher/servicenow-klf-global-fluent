import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['026910f6832a47903c9299e0deaad399'],
    name: 'KLF Delete This',
    table: 'u_klf_recordimporter_state',
    when: 'before',
    action: ['update', 'insert'],
    message: '<p>Delete this business rule</p>',
    addMessage: true,
    script: Now.include('./klf_delete_this.server.js'),
})
