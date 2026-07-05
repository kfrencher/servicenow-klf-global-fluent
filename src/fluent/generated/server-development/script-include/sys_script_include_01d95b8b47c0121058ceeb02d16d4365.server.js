// @ts-ignore
function KLF_RecordSync_UserUtilsTest(outputs, steps, params, stepResult, assertEqual) {
    var testScopeName = 'x_53417_test_scope';
    /** @type {Chance.Chance} */
    // @ts-ignore
    var chance = global.KLF_TestChance();

    function createUserUtils() {
        return new global.KLF_RecordSync_UserUtils({
            username: gs.getProperty('KLF_RecordSyncTest.remoteAdminUsername'),
            password: gs.getProperty('KLF_RecordSyncTest.remoteAdminPassword'),
            instanceUrl: gs.getProperty('KLF_RecordSyncTest.remoteInstanceUrl'),
            chunkSize: 20
        });
    }

    // List of all the user fields in the scope
    var userFieldsInScope = [{
            columnName: 'assigned_to',
            table: testScopeName + '_task',
            type: 'reference'
        },
        {
            columnName: 'readonly_users',
            table: testScopeName + '_task',
            type: 'glide_list'
        },
        {
            columnName: 'requested_for_user',
            table: testScopeName + '_request',
            type: 'reference'
        }
    ];

    var userFieldsInTask = userFieldsInScope.filter(function(field) {
        return field.table === testScopeName + '_task';
    });

    // The user fields in request, which will include the user fields in task
    // because the request table extends the task table
    var userFieldsInRequest = userFieldsInScope.filter(function(field) {
        return field.table === testScopeName + '_request' ||
            field.table === testScopeName + '_task';
    });

    /**
     * 
     * @param {KLF_RecordSync_UserField} f1 
     * @param {KLF_RecordSync_UserField} f2 
     * @returns {number}
     */
    function sortFieldsAscByColumnName(f1, f2) {
        return f1.columnName.localeCompare(f2.columnName);
    }
    describe(' - ', function() {
        /** @type {global.KLF_RecordSync_UserUtils} */
        var userUtils;
        /** @type {string} */
        var testScopeSysId;
        /** @type {global.KLF_TestUtils} */
        var testUtils;

        beforeEach(function() {
            userUtils = createUserUtils();
            testUtils = new global.KLF_TestUtils();
            testScopeSysId = testUtils.getScopeSysId(testScopeName);
        });

        afterEach(function() {
            testUtils.cleanup();
        });

        describe('getUserFields()', function() {
            it('should find all the user fields in the scope', function() {
                // Need to add the filter property to the expected fields.
                var expectedFields = userFieldsInScope.slice().map(function(field) {
                    // Cloning field
                    var _field = JSON.parse(JSON.stringify(field));
                    // @ts-ignore
                    _field.filter = undefined;
                    return _field;
                });

                var actualFields = userUtils.getUserFields(testScopeSysId);
                actualFields.sort(sortFieldsAscByColumnName);

                expect(actualFields).toBeEqual(expectedFields, 'Fields are correct');
            });
        });

        describe('getUserFieldsInTable()', function() {
            it('should find all the user fields in the specified table', function() {
                var taskActualFields = userUtils.getUserFieldsInTable(testScopeName + '_task');
                taskActualFields.sort(sortFieldsAscByColumnName);
                expect(taskActualFields).toBeEqual(userFieldsInTask, 'Task fields are correct');

                var requestActualFields = userUtils.getUserFieldsInTable(testScopeName + '_request');
                requestActualFields.sort(sortFieldsAscByColumnName);
                expect(requestActualFields).toBeEqual(userFieldsInRequest, 'Request fields are correct');
            });

            it('should throw error if table name does not exist', function() {
                expect(function() {
                    userUtils.getUserFieldsInTable('non_existent_table');
                }).toThrow();
            });

            it('should throw error if table name is falsy', function() {
                expect(function() {
                    userUtils.getUserFieldsInTable('');
                }).toThrow();
            });

        });

        describe('checkSysUserDisplayField()', function() {
            /** @type {GlideRecord} */
            var usernameField;
            beforeEach(function() {
                usernameField = new GlideRecord('sys_dictionary');
                usernameField.addQuery('name', 'sys_user');
                usernameField.addQuery('element', 'user_name');
                usernameField.query();
                usernameField.next();
            });

            it('should return true if sys_user display field is user_name', function() {
                usernameField.display = true;
                usernameField.update();

                expect(userUtils.checkSysUserDisplayField()).toBe(true, 'Display field is user_name');
            });

            it('should return false if sys_user display field is not user_name', function() {
                usernameField.display = false;
                usernameField.update();

                expect(userUtils.checkSysUserDisplayField()).toBe(false, 'Display field is not user_name');
            });
        });

        describe('clearSysUserDisplayField()', function() {
            /** @type {GlideRecord} */
            var usernameField;
            beforeEach(function() {
                usernameField = new GlideRecord('sys_dictionary');
                usernameField.addQuery('name', 'sys_user');
                usernameField.addQuery('element', 'user_name');
                usernameField.query();
                usernameField.next();
            });

            it('should set the display field of all columns in sys_user to false', function() {
                usernameField.display = true;
                usernameField.update();

                expect(userUtils.checkSysUserDisplayField()).toBe(true, 'Display field is user_name');

                userUtils.clearSysUserDisplayField();


                var sysUserDisplayField = new GlideRecord('sys_dictionary');
                sysUserDisplayField.addQuery('name', 'sys_user');
                sysUserDisplayField.addQuery('display', true);
                sysUserDisplayField.query();

                expect(sysUserDisplayField.hasNext()).toBe(false, 'Table should not have any display fields');
            });
        });

        describe('updateSysUserDisplayField()', function() {
            beforeEach(function() {
                userUtils.clearSysUserDisplayField();
            });

            it('should set the display field of the specified column in sys_user to true', function() {
                expect(userUtils.checkSysUserDisplayField()).toBe(false, 'Display field is not user_name');

                userUtils.updateSysUserDisplayField('user_name');

                var sysUserDisplayField = new GlideRecord('sys_dictionary');
                sysUserDisplayField.addQuery('name', 'sys_user');
                sysUserDisplayField.addQuery('display', true);
                sysUserDisplayField.query();
                sysUserDisplayField.next();

                expect(sysUserDisplayField.getRowCount()).toBe(1, 'Should have 1 row');
                expect(sysUserDisplayField.getValue('element')).toBe('user_name', 'Display field is user_name');
            });

            it('should return the current display field name', function() {
                // Make the name field the display field
                var nameField = new GlideRecord('sys_dictionary');
                nameField.addQuery('name', 'sys_user');
                nameField.addQuery('element', 'name');
                nameField.query();
                nameField.next();
                nameField.display = true;
                nameField.update();

                expect(userUtils.updateSysUserDisplayField('user_name')).toBe('name', 'Should be existing display field');
            });

            it('should throw an error if the specified column does not exist', function() {
                expect(function() {
                    userUtils.updateSysUserDisplayField('non_existent_column');
                }).toThrow();
            });

            it('should throw error if fieldname is falsy', function() {
                expect(function() {
                    userUtils.updateSysUserDisplayField('');
                }).toThrow();
            });
        });

        describe('getUniqueUsersInTable()', function() {
            var tableName = testScopeName + '_task';

            it('should return the unique users in the specified table', function() {
                var user1 = testUtils.createUser(chance.string({ length: 7, pool: 'abcdefghijklmnopqrstuvwxyz' }));
                var user2 = testUtils.createUser(chance.string({ length: 7, pool: 'abcdefghijklmnopqrstuvwxyz' }));
                var user3 = testUtils.createUser(chance.string({ length: 7, pool: 'abcdefghijklmnopqrstuvwxyz' }));

                function createTask( /** @type {GlideRecord} */ user) {
                    var task = new GlideRecord(tableName);
                    task.newRecord();
                    task.assigned_to = user.getUniqueValue();
                    task.update();
                }
                createTask(user1);
                createTask(user1);
                createTask(user2);
                createTask(user3);

                var uniqueUsers = userUtils.getUniqueUsersInTable(tableName);
                var expectedUsers = [user1.getUniqueValue(), user2.getUniqueValue(), user3.getUniqueValue()].sort();
                expect(uniqueUsers.sort()).toBeEqual(expectedUsers, 'Unique users are correct');
            });

            it('should throw error if table name does not exist', function() {
                expect(function() {
                    userUtils.getUniqueUsersInTable('non_existent_table');
                }).toThrow();
            });

            it('should throw error if table name is falsy', function() {
                expect(function() {
                    userUtils.getUniqueUsersInTable('');
                }).toThrow();
            });
        });
    });
}