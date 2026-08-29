import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['905762b9837c07103c9299e0deaad344'],
    name: 'KLF_RecordImporter',
    script: Now.include('./klf_recordimporter.server.js'),
    apiName: 'global.KLF_RecordImporter',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
