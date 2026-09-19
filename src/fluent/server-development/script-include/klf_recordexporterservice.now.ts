import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['96878b4e8330c7103c9299e0deaad3e4'],
    name: 'KLF_RecordExporterService',
    script: Now.include('./klf_recordexporterservice.server.js'),
    apiName: 'global.KLF_RecordExporterService',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
