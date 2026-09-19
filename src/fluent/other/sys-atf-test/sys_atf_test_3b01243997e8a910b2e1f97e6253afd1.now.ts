import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['3b01243997e8a910b2e1f97e6253afd1'],
        name: 'KLF_LdapGroupServiceTest',
        description: 'Tests for KLF_LdapGroupService',
        failOnServerError: true,
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['ec64243d97e8a910b2e1f97e6253af4d'],
            description: 'Run Server Side Validation Script',
            script: `KLF_TestJasmineMatchers(global);

global.KLF_LdapGroupServiceTest(outputs, steps, params, stepResult, assertEqual);

jasmine.getEnv().execute();`,
        })
    }
)
