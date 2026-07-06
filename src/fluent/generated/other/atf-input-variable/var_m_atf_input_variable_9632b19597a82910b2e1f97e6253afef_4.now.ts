import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['f6ffc8874723021058ceeb02d16d4371'],
    table: 'atf_input_variable',
    data: {
        active: 'true',
        array: 'false',
        attributes:
            'allow_public=true,element_mapping_provider=com.glide.automated_testing_framework.ATFVariableElementMapper',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        column_label: 'UI Action',
        display: 'false',
        dynamic_creation: 'false',
        element: 'u_ui_action',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'reference',
        label: 'UI Action',
        mandatory: 'false',
        max_length: '32',
        model: '9632b19597a82910b2e1f97e6253afef',
        model_id: '9632b19597a82910b2e1f97e6253afef',
        name: 'var__m_atf_input_variable_9632b19597a82910b2e1f97e6253afef',
        order: '100',
        primary: 'false',
        read_only: 'false',
        reference: 'sys_ui_action',
        reference_floats: 'false',
        reference_qual: 'javascript:global.getFormUIAction(current.inputs.u_table)',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'advanced',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
