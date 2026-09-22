import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['826156884700121058ceeb02d16d43a7'],
        name: 'KLF_RecordSync_RoleUtilsTest',
        description: 'Unit tests',
        failOnServerError: true,
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['5381d20c4700121058ceeb02d16d4368'],
            description: 'Run Server Side Validation Script',
            script: Now.include('./klf_recordsync_roleutilstest.test.server.js'),
        })
    }
)
