var glideRecordUtils = new global.KLF_GlideRecordUtils();

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

jasmine.getEnv().execute();
