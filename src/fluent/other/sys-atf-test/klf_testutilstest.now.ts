import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['a3a8458897b86550b2e1f97e6253affb'],
        name: 'KLF_TestUtilsTest',
        description: 'Tests for KLF_TestUtils',
        failOnServerError: true,
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['70d80d8897b86550b2e1f97e6253afa0'],
            description: 'Run Server Side Validation Script',
            script: Now.include('./klf_testutilstest.test.server.js'),
        })
    }
)
