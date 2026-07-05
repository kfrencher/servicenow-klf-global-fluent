import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['ed33a5d197682910b2e1f97e6253af0a'],
    name: 'KLF_LdapGroupService',
    script: Now.include('./sys_script_include_ed33a5d197682910b2e1f97e6253af0a.server.js'),
    apiName: 'global.KLF_LdapGroupService',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
