import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['d165423a87285290e2041f8d3fbb354c'],
    name: 'KLF_ScoperUtils',
    script: Now.include('./klf_scoperutils.server.js'),
    apiName: 'global.KLF_ScoperUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
