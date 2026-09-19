import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['b57b1f3297a42150b2e1f97e6253afed'],
        name: 'KLF_GlideRecordUtilsTest',
        description: 'Testing some global utility functions that involve GlideRecord',
        failOnServerError: true,
        $override: {
            u_template: 'false',
        },
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['78135f6b97ace150b2e1f97e6253af1a'],
            description: 'Run Server Side Validation Script',
            script: `var glideRecordUtils = new global.KLF_GlideRecordUtils();

describe('global.KLF_GlideRecordUtils.insertRecord', function() {
    it('should insert a record', function() {
        var insertedTask = glideRecordUtils.insertRecord('task', {
            short_description: 'Test task'
        });

        expect(insertedTask).not.toBeNull();
        expect(insertedTask.getUniqueValue()).not.toBeNull();
        expect(insertedTask.getValue('short_description')).toEqual('Test task');
    });
});

jasmine.getEnv().execute();`,
        })
    }
)
