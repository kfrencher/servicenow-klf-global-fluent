import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['994865ec33592e10504662989d5c7b20'],
    table: 'sys_script_fix',
    data: {
        before: false,
        name: 'KLF Test Migration',
        record_for_rollback: false,
        script: `(function() {
    var sourceScope = 'KLF Test Global'; // The scope to sync data from
    var scopeSysId = '34746a042bd5a2100060ff42fe91bf28'; // 

    var targetScope = 'x_53417_klf_test'; // The scope to sync data from
    var targetScopeSysId = '5374f750835da2103c9299e0deaad367'; // 

    /**
     * When initializing the KLF_RecordSync object you must pass in a configuration object
     * that contains connection information to the target instance.
     */
    function getConnectionConfig() {
        var connectionConfig = {
            instanceUrl: 'https://dev229555.service-now.com/',
            username: 'admin',
            password: gs.getProperty('KLF_RecordSync.password'),
            chunkSize: 20
        };
        return connectionConfig;
    }

    /**
     * Creates a user mapping for the target instance
     * @returns {KLF_RecordSync_UserMapping}
     */
    function createUserMapping() {
        var connectionConfig = getConnectionConfig();
        var userUtils = new global.KLF_RecordSync_UserUtils(connectionConfig);
        var users = userUtils.getUniqueUsersInScope(sourceScope);
        return userUtils.createUserMapping(users, sourceScope);
    }

    /**
     * Creates a group mapping for the target instance
     * @returns {KLF_RecordSync_GroupMapping}
     */
    function createGroupMapping() {
        var connectionConfig = getConnectionConfig();
        var groupUtils = new global.KLF_RecordSync_GroupUtils(connectionConfig);
        var groups = groupUtils.getUniqueGroupsInScope(sourceScope);
        return groupUtils.createGroupMapping(groups, sourceScope);
    }

    function transferData() {
        var connectionConfig = getConnectionConfig();
        var userMapping = new global.KLF_RecordSync_UserUtils(connectionConfig).getUserMapping(sourceScope);
        var groupMapping = new global.KLF_RecordSync_GroupUtils(connectionConfig).getGroupMapping(sourceScope);

        /** @type {KLF_MigratorUtils_Class} */
        // @ts-ignore
        var migratorUtils = new global.KLF_MigratorUtils({
                sourceScope: sourceScope,
                sourceScopeSysId: scopeSysId,
                targetScope: targetScope,
                targetScopeSysId: targetScopeSysId,
                tableMap: {
                    'u_klf_test_task': 'x_53417_klf_test_test_task'
                }
            },
            connectionConfig,
            userMapping,
            groupMapping
        );

        var record = new GlideRecord('u_klf_test_task');
        record.get('e05571fd2b5d2a100060ff42fe91bfe5');
        // Example of syncing all the data in a scope
        // This will find all tables in the x_53417_demo scope and sync all the data in those tables
        migratorUtils.syncRecord(record);
        // migratorUtils.syncTable('u_klf_test_task');

    }

    // Creates the user mapping. This is necessary to map the users in the source instance to the users in the target instance
    // createUserMapping();

    // Creates the group mapping. This is necessary to map the groups in the source instance to the groups in the target instance
    // createGroupMapping();

    // Transfers the data from the source instance to the target instance
    transferData();
})();`,
        unloadable: false,
        sys_name: 'KLF Test Migration',
    },
})
