import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['95cdc267477b421058ceeb02d16d4333'],
    name: 'KLF_RecordSync_RoleUtils',
    script: Now.include('./sys_script_include_95cdc267477b421058ceeb02d16d4333.server.js'),
    apiName: 'global.KLF_RecordSync_RoleUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
