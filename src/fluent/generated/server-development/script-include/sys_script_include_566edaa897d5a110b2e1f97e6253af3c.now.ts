import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['566edaa897d5a110b2e1f97e6253af3c'],
    name: 'KLF_MetricUtils',
    script: Now.include('./sys_script_include_566edaa897d5a110b2e1f97e6253af3c.server.js'),
    apiName: 'global.KLF_MetricUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
