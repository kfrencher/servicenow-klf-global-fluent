import { SPWidget } from '@servicenow/sdk/core'

SPWidget({
    $id: Now.ID['4f50c194478c121058ceeb02d16d434d'],
    name: 'KLF Ticket Conversations',
    category: 'standard',
    clientScript: Now.include('./sp_widget_klf_ticket_conversations/client_script.js'),
    serverScript: Now.include('./sp_widget_klf_ticket_conversations/server_script.js'),
    htmlTemplate: Now.include('./sp_widget_klf_ticket_conversations/template.html'),
    customCss: Now.include('./sp_widget_klf_ticket_conversations/style.scss'),
    demoData: {
        options: {
            sys_id: -1,
            table: 'incident',
        },
    },
    id: 'klf-ticket-conversations',
    linkScript: Now.include('./sp_widget_klf_ticket_conversations/link-script.js'),
    roles: ['snc_external', 'snc_internal'],
    optionSchema: [
        {
            hint: 'Placeholder text shows selected journal field',
            name: 'use_dynamic_placeholder',
            section: 'Behavior',
            label: 'Use dynamic placeholder',
            type: 'boolean',
        },
        {
            hint: 'Message to show when record has no readable journal field',
            name: 'no_readable_journal_field_message',
            defaultValue: '',
            section: 'Presentation',
            label: 'No readable journal field message',
            type: 'string',
        },
        {
            hint: 'Enter key behavior is specified by system property (glide.service_portal.comment.enter_adds_newline) unless overridden here',
            name: 'enter_key_behavior',
            section: 'Behavior',
            defaultValue: 'System property',
            label: 'Enter key behavior',
            type: 'choice',
            choices: [
                {
                    label: 'System property',
                    value: 'System property',
                },
                {
                    label: 'Submit',
                    value: 'Submit',
                },
                {
                    label: 'New line',
                    value: 'New line',
                },
            ],
        },
        {
            hint: 'Set to true to make the tiems on the timeline use all the horizontal space instead of using 50% of the space',
            name: 'is_klf_expanded_items',
            section: 'Presentation',
            defaultValue: 'false',
            label: 'Use Large Timeline Items',
            type: 'boolean',
        },
    ],
})
