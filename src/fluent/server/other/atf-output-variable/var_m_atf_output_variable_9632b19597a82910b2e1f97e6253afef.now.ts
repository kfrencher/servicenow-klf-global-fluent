import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['b6ffc8874723021058ceeb02d16d4384'],
    table: 'atf_output_variable',
    data: {
        active: 'true',
        array: 'false',
        attributes: 'element_mapping_provider=com.glide.automated_testing_framework.ATFVariableElementMapper',
        audit: 'false',
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        column_label: 'Record ID',
        dependent: 'u_table',
        dependent_on_field: 'u_table',
        display: 'false',
        dynamic_creation: 'false',
        element: 'u_record_id',
        element_reference: 'false',
        function_field: 'false',
        internal_type: 'document_id',
        label: 'Record ID',
        mandatory: 'false',
        max_length: '32',
        model: '9632b19597a82910b2e1f97e6253afef',
        model_id: '9632b19597a82910b2e1f97e6253afef',
        name: 'var__m_atf_output_variable_9632b19597a82910b2e1f97e6253afef',
        order: '100',
        primary: 'false',
        read_only: 'false',
        reference_floats: 'false',
        spell_check: 'false',
        staged: 'false',
        table_reference: 'false',
        text_index: 'false',
        unique: 'false',
        use_dependent_field: 'true',
        use_dynamic_default: 'false',
        use_reference_qualifier: 'simple',
        virtual: 'false',
        virtual_type: 'script',
        xml_view: 'false',
    },
})
