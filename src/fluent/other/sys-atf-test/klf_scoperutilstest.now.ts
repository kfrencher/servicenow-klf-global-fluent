import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['248f584787209290e2041f8d3fbb35cc'],
        name: 'KLF_ScoperUtilsTest',
        description: 'Tests for KLF_ScoperUtils object',
        failOnServerError: true,
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['648f584787209290e2041f8d3fbb35d1'],
            description: 'Run Server Side Validation Script',
            script: Now.include('./klf_scoperutilstest.test.server.js'),
        })
    }
)
