import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['fe19c50a97f44a1024d7b066f053afdb'],
    name: 'KLF_DataTransferUtils',
    script: Now.include('./klf_datatransferutils.server.js'),
    apiName: 'global.KLF_DataTransferUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
