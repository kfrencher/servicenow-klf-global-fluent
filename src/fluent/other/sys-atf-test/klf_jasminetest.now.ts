import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['1baee2354700121058ceeb02d16d430b'],
        name: 'KLF_JasmineTest',
        description: 'Testing capabilities of Jasmine running in ServiceNow',
        failOnServerError: true,
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['5f0fa6f54700121058ceeb02d16d430f'],
            description: 'Run Server Side Validation Script',
            script: Now.include('./klf_jasminetest.test.server.js'),
        })
    }
)
