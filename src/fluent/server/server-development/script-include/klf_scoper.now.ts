import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['45b68db447e8161058ceeb02d16d430d'],
    name: 'KLF_Scoper',
    script: Now.include('./klf_scoper.server.js'),
    apiName: 'global.KLF_Scoper',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
