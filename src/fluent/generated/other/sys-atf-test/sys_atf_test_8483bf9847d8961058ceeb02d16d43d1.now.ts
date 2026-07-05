import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['8483bf9847d8961058ceeb02d16d43d1'],
        name: 'KLF_RecordSync_GroupUtilsTest',
        description: 'Tests for KLF_RecordSync_GroupUtilsTest',
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['1f93f3d847d8961058ceeb02d16d430e'],
            description: 'Run Server Side Validation Script',
            notes: 'KLF_RecordSync_GroupUtilsTest',
            script: `KLF_TestJasmineMatchers(global);\r
\r
KLF_RecordSync_GroupUtilsTest(outputs, steps, params, stepResult, assertEqual);\r
\r
jasmine.getEnv().execute();`,
        })
    }
)
