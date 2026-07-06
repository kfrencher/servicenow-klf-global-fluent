/**
 * Maybe create a UI Action that has a mapping of old table names to new table names.
 * Then you can click the UI Action and it would clone the script into the target scope as
 * well as modify the script to use the new table names.
 */

/**
 * Object used to generate a table in a target scope based on a global table.
 * This is to make it faster to scope a global application.
 * 
 * The column names of the resulting scoped table will be the same as the global table
 * including any columns with a u_ prefix.
 * 
 * The following tables are included in the process:
 * - sys_db_object
 * - sys_dictionary
 * - sys_documentation
 * - sys_embedded_help_role
 * - sys_security_acl
 * - sys_security_acl_role
 * - sys_user_role
 * - sys_wizard_answer
 * - ua_table_licensing_config
 */
var global = global || {};

/**
 * @param {string} targetScope 
 */
global.KLF_TableScoper = function(targetScope) {
    this.targetScope = targetScope;
};

global.KLF_TableScoper.prototype = {};