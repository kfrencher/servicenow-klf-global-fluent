import { SPWidget } from '@servicenow/sdk/core'

SPWidget({
    $id: Now.ID['92c07f6f97f6211024d7b066f053afaa'],
    name: 'KLF Data Table',
    clientScript: Now.include('./sp_widget_klf_data_table/client_script.js'),
    serverScript: Now.include('./sp_widget_klf_data_table/server_script.js'),
    htmlTemplate: Now.include('./sp_widget_klf_data_table/template.html'),
    customCss: Now.include('./sp_widget_klf_data_table/style.scss'),
    dataTable: 'sp_instance_table',
    demoData: {
        data: {
            table: 'incident',
            view: 'default',
            o: 'opened_at',
            d: 'desc',
            filter: 'activeEQtrue',
            p: 1,
            fields: 'number,short_description',
        },
    },
    fields: [
        'table',
        'filter',
        'field_list',
        'maximum_entries',
        'order',
        'order_by',
        'order_direction',
        'title',
        'color',
        'glyph',
        'sp_page',
    ],
    id: 'klf_data_table',
    linkScript: Now.include('./sp_widget_klf_data_table/link-script.js'),
    optionSchema: [
        {
            hint: 'If enabled, show the list filter in the breadcrumbs of the data table',
            name: 'enable_filter',
            defaultValue: 'false',
            section: 'Behavior',
            label: 'Enable Filter',
            type: 'boolean',
        },
    ],
})
