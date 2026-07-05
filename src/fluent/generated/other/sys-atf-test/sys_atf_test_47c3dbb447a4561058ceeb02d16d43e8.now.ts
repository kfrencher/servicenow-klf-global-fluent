import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['47c3dbb447a4561058ceeb02d16d43e8'],
        name: 'KLF_ScoperTest',
        description: 'Tests for KLF_Scoper object',
        failOnServerError: true,
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['5cf3dfb447a4561058ceeb02d16d4393'],
            description: 'Run Server Side Validation Script',
            script: `KLF_TestJasmineMatchers(global);\r
\r
KLF_ScoperTest(outputs, steps, params, stepResult, assertEqual);\r
\r
jasmine.getEnv().execute();`,
        })
    }
)
