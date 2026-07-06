import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['6f005c9397152110b2e1f97e6253af8f'],
    name: 'ECCQUEUE onKlfCommandInsert',
    table: 'ecc_queue',
    when: 'before',
    action: ['update', 'insert'],
    filterCondition: 'source=KLF_CommandProbe^stateCHANGESTOready^queue=input^EQ',
    script: Now.include('./eccqueue_onklfcommandinsert.server.js'),
})
