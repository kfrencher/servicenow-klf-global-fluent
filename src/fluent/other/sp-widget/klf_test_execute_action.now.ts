import { SPWidget } from '@servicenow/sdk/core'

SPWidget({
    $id: Now.ID['145aa656ff52321020d2333663e97251'],
    name: 'KLF Test Execute Action',
    clientScript: Now.include('./sp_widget_klf_test_execute_action/client_script.js'),
    serverScript: Now.include('./sp_widget_klf_test_execute_action/server_script.js'),
    htmlTemplate: Now.include('./sp_widget_klf_test_execute_action/template.html'),
    id: 'klf_test_execute_action',
    linkScript: Now.include('./sp_widget_klf_test_execute_action/link-script.js'),
    angularProviders: ['cf2feedeff52321020d2333663e97267'],
    $meta: {
        useEsLatest: true,
    },
})
