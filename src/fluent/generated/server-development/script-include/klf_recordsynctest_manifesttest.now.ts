import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['4c4b2d5847dc561058ceeb02d16d43eb'],
    name: 'KLF_RecordSyncTest_ManifestTest',
    script: Now.include('./klf_recordsynctest_manifesttest.server.js'),
    apiName: 'global.KLF_RecordSyncTest_ManifestTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
