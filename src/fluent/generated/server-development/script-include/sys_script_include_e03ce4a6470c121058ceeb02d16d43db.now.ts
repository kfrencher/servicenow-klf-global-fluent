import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['e03ce4a6470c121058ceeb02d16d43db'],
    name: 'KLF_RoleUtils',
    script: Now.include('./sys_script_include_e03ce4a6470c121058ceeb02d16d43db.server.js'),
    apiName: 'global.KLF_RoleUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
