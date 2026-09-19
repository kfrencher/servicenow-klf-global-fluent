import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['25fa15df4733021058ceeb02d16d4338'],
    name: 'KLF_TableScoper',
    script: Now.include('./klf_tablescoper.server.js'),
    apiName: 'global.KLF_TableScoper',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
