import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['56852b4f97112110b2e1f97e6253afc5'],
    name: 'KLF_CommandProbe',
    script: Now.include('./klf_commandprobe.server.js'),
    apiName: 'global.KLF_CommandProbe',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
