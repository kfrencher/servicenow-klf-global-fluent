// @ts-ignore
function KLF_LdapGroupServiceTest(outputs, steps, params, stepResult, assertEqual) {
    describe('KLF_LdapGroupServiceTest.getGroupByDn', function() {

        /** @type {string} */
        var expectedGroupName;
        /** @type {global.KLF_TestUtils} */
        var testUtils;
        beforeAll(function() {
            testUtils = new global.KLF_TestUtils();
            expectedGroupName = testUtils.getRandomGroupName();
            var group = testUtils.createGroup(expectedGroupName);
            group.source = 'ldap:' + expectedGroupName;
            group.update();
        });

        try {
            var ldapGroupService = new global.KLF_LdapGroupService({
                ldapServerName: 'Example LDAP Server'
            });
        } catch (e) {
            stepResult.setOutputMessage(e);
            stepResult.setFailed();
            return;
        }

        it('should return group when one exists', function() {
            var group = ldapGroupService.getGroupByDn(expectedGroupName);
            expect(group).not.toBeNull('Group should exist');
            if (group) {
                expect(group.getValue('name')).toBe(expectedGroupName, 'Group name is correct');
            }
        });

        it('should not return a group when no group name is provided', function() {
            // @ts-ignore
            var group = ldapGroupService.getGroupByDn();
            expect(group).toBeNull('Group should not exist');
        });

        it('should not return group when given a bad group name', function() {
            var group = ldapGroupService.getGroupByDn('INVALID GROUP NAME');
            expect(group).toBeNull('Group should not exist');
        });

    });
}