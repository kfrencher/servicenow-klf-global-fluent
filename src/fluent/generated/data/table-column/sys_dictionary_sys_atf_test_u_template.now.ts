import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['b153c99d5c3f4434909661fe95bf3221'],
    table: 'sys_dictionary',
    data: {
        active: true,
        array: false,
        attributes: 'edge_encryption_enabled=true',
        audit: false,
        calculation: `(function calculatedFieldValue(current) {

	// Add your code here
	return '';  // return the calculated value

})(current);`,
        column_label: 'Template',
        display: false,
        dynamic_creation: false,
        element: 'u_template',
        element_reference: false,
        function_field: false,
        internal_type: 'boolean',
        mandatory: false,
        max_length: 40,
        name: 'sys_atf_test',
        primary: false,
        read_only: false,
        reference_floats: false,
        spell_check: false,
        staged: false,
        table_reference: false,
        text_index: false,
        unique: false,
        use_dependent_field: false,
        use_dynamic_default: false,
        use_reference_qualifier: 'simple',
        virtual: false,
        virtual_type: 'script',
        xml_view: false,
    },
})
