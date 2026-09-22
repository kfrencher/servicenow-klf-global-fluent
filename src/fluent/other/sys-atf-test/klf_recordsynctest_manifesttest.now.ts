import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['71ea695847dc561058ceeb02d16d43cd'],
        name: 'KLF_RecordSyncTest_ManifestTest',
        description: 'Tests for KLF_RecordSync.Manifest',
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['141b659c4798561058ceeb02d16d43ab'],
            description: 'Run Server Side Validation Script',
            script: Now.include('./klf_recordsynctest_manifesttest.test.server.js'),
        })
    }
)
