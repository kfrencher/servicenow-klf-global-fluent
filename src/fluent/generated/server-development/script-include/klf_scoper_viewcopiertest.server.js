function KLF_Scoper_ViewCopierTest() {
    describe('', function() {
        describe('copyUiForm()', function() {
            it('should copy a form from one scope to another', function() {
                var sourceForm = new GlideRecord('sys_ui_form');
                sourceForm.addQuery('name', 'scoper_test');
                sourceForm.addQuery('view', 'scoper_test');
                sourceForm.query();
                expect(sourceForm.next()).toBe(true);

                // @ts-ignore
                var scoper = new global.KLF_Scoper();

            });
        });
    });
}