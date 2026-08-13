import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['d71457eb97ace150b2e1f97e6253aff7'],
        name: 'KLF_AtfAddStepsHelperTest',
        description: 'Testing the code added to add test steps from a selected test to another test',
        failOnServerError: true,
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['7f2497eb97ace150b2e1f97e6253af02'],
            description: 'Run Server Side Validation Script',
            script: `KLF_TestJasmineMatchers(global);

KLF_AtfAddStepsHelperTest(outputs, steps, params, stepResult, assertEqual);

jasmine.getEnv().execute();`,
        })
    }
)
