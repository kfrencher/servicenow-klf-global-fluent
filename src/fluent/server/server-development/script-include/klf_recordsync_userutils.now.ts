import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['dfa92c90477b461058ceeb02d16d43a6'],
    name: 'KLF_RecordSync_UserUtils',
    script: Now.include('./klf_recordsync_userutils.server.js'),
    apiName: 'global.KLF_RecordSync_UserUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
    $meta: {
        useEsLatest: false,
    },
})
