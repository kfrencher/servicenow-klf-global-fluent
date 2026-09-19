/**
 * This script contains general functions that help with role management in ServiceNow.
 * - userHasRole: Returns true if the user has the specified role.
 * - groupHasRole: Returns true if the group has the role.
 */

global.KLF_RoleUtils = function() {};

global.KLF_RoleUtils.prototype = {
    /**
     * @param {string} message 
     */
    logError: function(message) {
        gs.logError(message, "KLF_RoleUtils");
    },

    /**
     * Returns true if the user has the specified role.
     * @param {string} username
     * @param {string} roleName
     * @returns {boolean}
     */
    userHasRole: function(username, roleName) {
        if (!username) {
            this.logError("KLF_RoleUtils.userHasRole: username is required");
            return false;
        }

        if (!roleName) {
            this.logError("KLF_RoleUtils.userHasRole: roleName is required");
            return false;
        }

        var userRole = new GlideRecord("sys_user_has_role");
        userRole.addQuery("user.user_name", username);
        userRole.addQuery("role.name", roleName);
        userRole.query();
        return userRole.hasNext();
    },

    /**
     * Returns true if the group has the role
     * @param {string} groupName
     * @param {string} roleName
     * @returns {boolean}
     */
    groupHasRole: function(groupName, roleName) {
        if (!groupName) {
            this.logError("KLF_RoleUtils.userHasRole: groupName is required");
            return false;
        }

        if (!roleName) {
            this.logError("KLF_RoleUtils.userHasRole: roleName is required");
            return false;
        }

        var groupRole = new GlideRecord("sys_group_has_role");
        groupRole.addQuery("group.name", groupName);
        groupRole.addQuery("role.name", roleName);
        groupRole.query();
        return groupRole.hasNext();
    },
};