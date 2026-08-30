import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['1f85105347d0121058ceeb02d16d434f'],
    name: 'KLF_AtfAddStepsHelperTest',
    script: Now.include('./klf_atfaddstepshelpertest.server.js'),
    apiName: 'global.KLF_AtfAddStepsHelperTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
