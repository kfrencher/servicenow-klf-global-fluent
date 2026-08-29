import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['01d95b8b47c0121058ceeb02d16d4365'],
    name: 'KLF_RecordSync_UserUtilsTest',
    script: Now.include('./klf_recordsync_userutilstest.server.js'),
    apiName: 'global.KLF_RecordSync_UserUtilsTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
