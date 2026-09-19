import { Table, StringColumn, BooleanColumn } from '@servicenow/sdk/core'

export const u_klf_recordimporter_state = Table({
    allowWebServiceAccess: true,
    label: 'KLF_RecordImporter_State',
    name: 'u_klf_recordimporter_state',
    schema: {
        u_checkpoint: StringColumn({
            label: 'Checkpoint',
            maxLength: 10000,
        }),
        u_data_manifest: StringColumn({
            label: 'Data Manifest',
            maxLength: 1000,
        }),
        u_force_transform_all: BooleanColumn({
            default: false,
            label: 'Force Transform All',
            maxLength: 40,
        }),
        u_group_mapping: StringColumn({
            label: 'Group Mapping',
            maxLength: 5000,
        }),
        u_loaded_data_json: StringColumn({
            label: 'Loaded Data JSON',
            maxLength: 5000,
        }),
        u_loaded_data: StringColumn({
            label: 'Loaded Data',
            maxLength: 5000,
        }),
        u_name: StringColumn({
            label: 'Name',
            maxLength: 255,
            readOnly: true,
            readOnlyOption: 'instance_configured',
            unique: true,
        }),
        u_scheduled_job_name: StringColumn({
            dropdown: 'dropdown_with_none',
            label: 'Scheduled Job Name',
            maxLength: 255,
        }),
        u_state: StringColumn({
            dropdown: 'dropdown_with_none',
            label: 'State',
            maxLength: 40,
        }),
        u_transform_position: StringColumn({
            label: 'Transform Position',
            maxLength: 255,
        }),
        u_user_mapping: StringColumn({
            label: 'User Mapping',
            maxLength: 5000,
        }),
        u_logs: StringColumn({
            label: 'Logs',
            maxLength: 10000,
        }),
        u_transaction_id: StringColumn({
            label: 'Transaction ID',
            maxLength: 32,
            readOnly: true,
            readOnlyOption: 'instance_configured',
        }),
    },
    createAccessControls: true,
    actions: {
        read: true,
        update: false,
        delete: false,
        create: false,
    },
    allowClientScripts: false,
    allowNewFields: false,
    allowUiActions: false,
})
