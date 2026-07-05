import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['5fc557ba97642150b2e1f97e6253af67'],
    name: 'KLF_GlideRecordUtils',
    script: Now.include('./sys_script_include_5fc557ba97642150b2e1f97e6253af67.server.js'),
    apiName: 'global.KLF_GlideRecordUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
