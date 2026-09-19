import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['d918c10447d4161058ceeb02d16d43f5'],
        name: 'KLF_RecordSyncTest',
        description: 'Tests for KLF_RecordSync',
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['833885444718161058ceeb02d16d4302'],
            description: 'Run Server Side Validation Script',
            script: `KLF_TestJasmineMatchers(global);

KLF_RecordSyncTest(outputs, steps, params, stepResult, assertEqual);

jasmine.getEnv().execute();`,
        })
    }
)
