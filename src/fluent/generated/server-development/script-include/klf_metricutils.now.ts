import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['566edaa897d5a110b2e1f97e6253af3c'],
    name: 'KLF_MetricUtils',
    script: Now.include('./klf_metricutils.server.js'),
    apiName: 'global.KLF_MetricUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
