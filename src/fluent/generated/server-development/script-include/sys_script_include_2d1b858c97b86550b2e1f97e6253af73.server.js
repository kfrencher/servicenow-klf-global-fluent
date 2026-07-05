// @ts-ignore
function KLF_TestUtilsTest(outputs, steps, params, stepResult, assertEqual) {
    describe('', function() {
        /** @type {global.KLF_TestUtils} */
        var testUtils;
        /** @type {global.KLF_TestUtils.RecordTracker} */
        var recordTracker;
        beforeEach(function() {
            testUtils = new global.KLF_TestUtils();
            recordTracker = testUtils.recordTracker;

        });

        afterEach(function() {
            testUtils.cleanup();
        });

        function createTask() {
            var task = new GlideRecord('task');
            task.newRecord();
            return task;
        }

        describe('RecordTracker', function() {
            // These 2 tests hit a lot of the code in the RecordTracker class
            // It will access trackByGlideRecord, getDocuments, hasGlideRecord, and trackBySysId
            it('should track records by GlideRecord', function() {
                var task1 = createTask();
                var task2 = createTask();
                recordTracker.trackByGlideRecord(task1)
                    .trackByGlideRecord(task2);

                var documents = recordTracker.getDocuments();
                expect(documents.length).toBe(2, 'Number of documents');
                expect(recordTracker.hasGlideRecord(task1)).toBe(true, 'Task 1 should be tracked');
            });

            it('should not add duplicates to document list', function() {
                var task1 = createTask();
                recordTracker.trackByGlideRecord(task1)
                    .trackByGlideRecord(task1);

                var documents = recordTracker.getDocuments();
                expect(documents.length).toBe(1, 'Number of documents');
                expect(recordTracker.hasGlideRecord(task1)).toBe(true, 'Task 1 should be tracked');
            });
        });

        describe('impersonateUser()', function() {
            it('should impersonate the user with the given sys_id', function() {
                var user = testUtils.createUser(testUtils.getRandomUsername());
                testUtils.impersonateUser(user.sys_id);
                expect(user.getValue('sys_id')).toBe(gs.getUserID(), 'User should be impersonated');
            });
        });

        describe('createScope()', function() {
            it('should create a scope with the given name', function() {
                var scopeName = testUtils.getRandomAlphaNumericString();
                var scope = testUtils.createScope(scopeName);
                expect(scope.get('scope', scopeName)).toBe(true, 'Scope should be created');
            });

            it('should throw an error if the scope already exists', function() {
                var scopeName = testUtils.getRandomAlphaNumericString();
                testUtils.createScope(scopeName);

                expect(function() {
                    testUtils.createScope(scopeName);
                }).toThrow();
            });

            it('should throw an error if the scope name is falsy', function() {
                expect(function() {
                    testUtils.createScope('');
                }).toThrow();
            });
        });

        describe('getScopeSysId', function() {
            it('should return the sys_id of the scope with the given name', function() {
                var scopeName = testUtils.getRandomAlphaNumericString();
                var scope = testUtils.createScope(scopeName);
                expect(testUtils.getScopeSysId(scopeName)).toBe(scope.getUniqueValue(), 'Scope should be created');
            });

            it('should throw an error if the scope does not exist', function() {
                expect(function() {
                    testUtils.getScopeSysId(testUtils.getRandomAlphaNumericString());
                }).toThrow();
            });

        });

    });
}