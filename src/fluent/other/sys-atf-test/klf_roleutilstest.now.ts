import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['6ad6f8a6474c121058ceeb02d16d4361'],
        name: 'KLF_RoleUtilsTest',
        description: 'Unit tests for KLF_RoleUtils',
        failOnServerError: true,
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['aef63866474c121058ceeb02d16d4304'],
            description: 'Run Server Side Validation Script',
            script: Now.include('./klf_roleutilstest.test.server.js'),
        })
    }
)
