import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['d358538c9701021024d7b066f053af34'],
    name: 'KLF_RecordSync',
    script: Now.include('./klf_recordsync.server.js'),
    apiName: 'global.KLF_RecordSync',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
