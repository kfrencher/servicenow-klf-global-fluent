import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['7d731b6b97ace150b2e1f97e6253afcc'],
    name: 'KLF_AtfAddStepsHelper',
    script: Now.include('./sys_script_include_7d731b6b97ace150b2e1f97e6253afcc.server.js'),
    apiName: 'global.KLF_AtfAddStepsHelper',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
