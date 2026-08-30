import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['33c41fb447a4561058ceeb02d16d4336'],
    name: 'KLF_ScoperTest',
    script: Now.include('./klf_scopertest.server.js'),
    apiName: 'global.KLF_ScoperTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
