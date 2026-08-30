import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['90733b9847d8961058ceeb02d16d43d9'],
    name: 'KLF_RecordSync_GroupUtilsTest',
    script: Now.include('./klf_recordsync_grouputilstest.server.js'),
    apiName: 'global.KLF_RecordSync_GroupUtilsTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
