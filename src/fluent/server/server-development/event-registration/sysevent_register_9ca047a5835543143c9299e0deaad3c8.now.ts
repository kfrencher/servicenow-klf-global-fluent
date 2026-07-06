import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['9ca047a5835543143c9299e0deaad3c8'],
    table: 'sysevent_register',
    data: {
        derived_priority: 100,
        description: 'Fired after source has been inserted and there is an attachment that needs to be linked',
        event_name: 'klf_recordimporter.link_attachment',
        fired_by: 'KLF_RecordImporter',
        priority: 100,
        table: 'sys_attachment',
    },
})
