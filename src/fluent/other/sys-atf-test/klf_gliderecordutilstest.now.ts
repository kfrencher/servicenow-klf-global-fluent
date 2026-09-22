import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['b57b1f3297a42150b2e1f97e6253afed'],
        name: 'KLF_GlideRecordUtilsTest',
        description: 'Testing some global utility functions that involve GlideRecord',
        failOnServerError: true,
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['78135f6b97ace150b2e1f97e6253af1a'],
            description: 'Run Server Side Validation Script',
            script: Now.include('./klf_gliderecordutilstest.test.server.js'),
        })
    }
)
