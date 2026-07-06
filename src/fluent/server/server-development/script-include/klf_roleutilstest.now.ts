import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['2449782a474c121058ceeb02d16d43f6'],
    name: 'KLF_RoleUtilsTest',
    script: Now.include('./klf_roleutilstest.server.js'),
    apiName: 'global.KLF_RoleUtilsTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
