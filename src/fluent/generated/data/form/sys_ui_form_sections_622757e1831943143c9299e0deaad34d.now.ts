import { Form, default_view } from '@servicenow/sdk/core'

Form({
    table: 'u_klf_recordimporter_state',
    view: default_view,
    sections: [
        {
            caption: '',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        {
                            field: 'u_name',
                            type: 'table_field',
                        },
                        {
                            field: 'u_scheduled_job_name',
                            type: 'table_field',
                        },
                        {
                            field: 'u_transaction_id',
                            type: 'table_field',
                        },
                    ],
                    rightElements: [
                        {
                            field: 'u_state',
                            type: 'table_field',
                        },
                        {
                            field: 'u_transform_position',
                            type: 'table_field',
                        },
                        {
                            field: 'u_force_transform_all',
                            type: 'table_field',
                        },
                    ],
                },
                {
                    layout: 'one-column',
                    elements: [
                        {
                            field: 'u_data_manifest',
                            type: 'table_field',
                        },
                        {
                            field: 'u_loaded_data',
                            type: 'table_field',
                        },
                        {
                            field: 'u_checkpoint',
                            type: 'table_field',
                        },
                        {
                            field: 'u_user_mapping',
                            type: 'table_field',
                        },
                        {
                            field: 'u_group_mapping',
                            type: 'table_field',
                        },
                        {
                            field: 'u_logs',
                            type: 'table_field',
                        },
                    ],
                },
            ],
        },
    ],
})
