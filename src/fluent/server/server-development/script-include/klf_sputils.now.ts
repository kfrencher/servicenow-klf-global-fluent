import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['dc93e1d197682910b2e1f97e6253af1a'],
    name: 'KLF_SPUtils',
    script: Now.include('./klf_sputils.server.js'),
    apiName: 'global.KLF_SPUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
