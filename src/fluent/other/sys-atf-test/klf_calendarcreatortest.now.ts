import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['8a24324e833c36103c9299e0deaad32d'],
        name: 'KLF_CalendarCreatorTest',
        description: 'Tests for KLF_CalendarCreatorTest object',
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['95c4368e833c36103c9299e0deaad3cc'],
            description: 'Run Server Side Validation Script',
            script: Now.include('./klf_calendarcreatortest.test.server.js'),
        })
    }
)
