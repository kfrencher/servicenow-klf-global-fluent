import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['1499178b47c0121058ceeb02d16d4306'],
        name: 'KLF_RecordSync_UserUtilsTest',
        description: 'Unit tests for KLF_RecordSync_UserUtilsTest',
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['0af6bd134700521058ceeb02d16d43e7'],
            description: 'Run Server Side Validation Script',
            notes: 'KLF_RecordSync_UserUtilsTest',
            script: `KLF_TestJasmineMatchers(global);

KLF_RecordSync_UserUtilsTest(outputs, steps, params, stepResult, assertEqual);

jasmine.getEnv().execute();`,
        })
    }
)
