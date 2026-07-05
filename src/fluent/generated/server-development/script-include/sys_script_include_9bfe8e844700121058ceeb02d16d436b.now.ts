import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['9bfe8e844700121058ceeb02d16d436b'],
    name: 'KLF_RecordSync_RoleUtilsTest',
    script: Now.include('./sys_script_include_9bfe8e844700121058ceeb02d16d436b.server.js'),
    apiName: 'global.KLF_RecordSync_RoleUtilsTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
