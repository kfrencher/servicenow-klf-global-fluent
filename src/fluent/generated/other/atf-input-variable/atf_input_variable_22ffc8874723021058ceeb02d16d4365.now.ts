import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['22ffc8874723021058ceeb02d16d4365'],
    table: 'atf_input_variable',
    data: {
        active: 'true',
        array: 'false',
        attributes: 'element_mapping_provider=com.glide.automated_testing_framework.ATFVariableElementMapper',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        choice: '1',
        column_label: 'Assert Type',
        display: 'false',
        dynamic_creation: 'false',
        element: 'u_assert_type',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'choice',
        label: 'Assert Type',
        mandatory: 'false',
        max_length: '40',
        model: '9632b19597a82910b2e1f97e6253afef',
        model_id: '9632b19597a82910b2e1f97e6253afef',
        name: 'var__m_atf_input_variable_9632b19597a82910b2e1f97e6253afef',
        order: '100',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'false',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
