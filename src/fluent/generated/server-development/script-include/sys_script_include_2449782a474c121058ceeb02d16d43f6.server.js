// @ts-ignore
function KLF_RoleUtilsTest(outputs, steps, params, stepResult, assertEqual) {

    describe('userHasRole', function() {
        /** @type {Chance.Chance} */
        // @ts-ignore
        var chance = global.KLF_TestChance();

        /** @type {global.KLF_TestUtils} */
        var testUtils;
        beforeEach(function() {
            testUtils = new global.KLF_TestUtils();
        });

        afterEach(function() {
            testUtils.cleanup();
        });

        it('should return true when the user has the role', function() {
            var roleName = testUtils.getRandomAlphaNumericString();
            var user = testUtils.createUser(testUtils.getRandomUsername());
            testUtils.createRole(roleName);
            testUtils.addRoleToUser(user, roleName);

            var roleUtils = new global.KLF_RoleUtils();
            var userHasRole = roleUtils.userHasRole(user.getValue('user_name'), roleName);

            expect(userHasRole).toBe(true, 'Should have role');
        });

        it('should return false when the user does not have the role', function() {
            var roleName = testUtils.getRandomAlphaNumericString();
            var user = testUtils.createUser(testUtils.getRandomUsername());
            testUtils.createRole(roleName);
            var roleUtils = new global.KLF_RoleUtils();

            var userHasRole = roleUtils.userHasRole(user.getValue('user_name'), roleName);

            expect(userHasRole).toBe(false, 'Should not have role');
        });

        it('should return false when the user is falsy', function() {
            var roleName = testUtils.getRandomAlphaNumericString();
            testUtils.createRole(roleName);


            spyOn(global.KLF_RoleUtils.prototype, 'logError');
            var roleUtils = new global.KLF_RoleUtils();
            var userHasRole = roleUtils.userHasRole('', roleName);

            expect(userHasRole).toBe(false, 'Should not have role');
            expect(global.KLF_RoleUtils.prototype.logError).toHaveBeenCalled();
        });

        it('should return false when the role is falsy', function() {
            var user = testUtils.getOrCreateCommonUser();
            var roleUtils = new global.KLF_RoleUtils();

            spyOn(global.KLF_RoleUtils.prototype, 'logError');
            var userHasRole = roleUtils.userHasRole(user.getValue('user_name'), '');

            expect(userHasRole).toBe(false, 'Should not have role');
            expect(global.KLF_RoleUtils.prototype.logError).toHaveBeenCalled();
        });
    });

    describe("groupHasRole", function() {
        /** @type {global.KLF_TestUtils} */
        var testUtils;
        beforeEach(function() {
            testUtils = new global.KLF_TestUtils();
        });

        afterEach(function() {
            testUtils.cleanup();
        });

        it('should return true when the group has the role', function() {
            var roleName = testUtils.getRandomAlphaNumericString();
            var group = testUtils.createGroup(testUtils.getRandomGroupName());
            testUtils.createRole(roleName);
            testUtils.addRoleToGroup(group, roleName);

            var roleUtils = new global.KLF_RoleUtils();
            var groupHasRole = roleUtils.groupHasRole(group.getValue('name'), roleName);

            expect(groupHasRole).toBe(true, 'Should have role');
        });

        it('should return false when the group does not have the role', function() {
            var roleName = testUtils.getRandomAlphaNumericString();
            var group = testUtils.createGroup(testUtils.getRandomGroupName());
            testUtils.createRole(roleName);
            var roleUtils = new global.KLF_RoleUtils();

            var groupHasRole = roleUtils.groupHasRole(group.getValue('name'), roleName);

            expect(groupHasRole).toBe(false, 'Should not have role');
        });

        it('should return false when the group name is falsy', function() {
            var roleName = testUtils.getRandomAlphaNumericString();
            testUtils.createRole(roleName);

            spyOn(global.KLF_RoleUtils.prototype, 'logError');

            var roleUtils = new global.KLF_RoleUtils();
            var groupHasRole = roleUtils.groupHasRole('', roleName);

            expect(groupHasRole).toBe(false, 'Should not have role');
            expect(global.KLF_RoleUtils.prototype.logError).toHaveBeenCalled();
        });

        it('should return false when the role name is falsy', function() {
            var group = testUtils.createGroup(testUtils.getRandomGroupName());
            var roleUtils = new global.KLF_RoleUtils();

            spyOn(global.KLF_RoleUtils.prototype, 'logError');
            var groupHasRole = roleUtils.groupHasRole(group.getValue('name'), '');

            expect(groupHasRole).toBe(false, 'Should not have role');
            expect(global.KLF_RoleUtils.prototype.logError).toHaveBeenCalled();
        });

    });
}