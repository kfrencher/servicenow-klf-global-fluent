import { ClientScript } from '@servicenow/sdk/core'

ClientScript({
    $id: Now.ID['170eb3fd97346510b2e1f97e6253aff5'],
    type: 'onLoad',
    table: 'sys_atf_test',
    isolateScript: true,
    script: Now.include('./description_mandatory_add_placeholder.client.js'),
    name: 'Description mandatory / Add placeholder',
})
