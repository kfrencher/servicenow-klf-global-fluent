import { SPWidget } from '@servicenow/sdk/core'

SPWidget({
    $id: Now.ID['bef4a95597682910b2e1f97e6253af86'],
    name: 'KLF Form',
    clientScript: Now.include('./sp_widget_klf_form/client_script.js'),
    serverScript: Now.include('./sp_widget_klf_form/server_script.js'),
    htmlTemplate: Now.include('./sp_widget_klf_form/template.html'),
    customCss: Now.include('./sp_widget_klf_form/style.scss'),
    description: `This form is cloned from the "form" widget.

Refer to comments in the "Server script" field for details on customizations.`,
    id: 'klf_form',
    linkScript: Now.include('./sp_widget_klf_form/link-script.js'),
    optionSchema: [
        {
            name: 'disableUIActions',
            section: 'Behavior',
            label: 'Disable UI Actions on Form',
            type: 'boolean',
        },
        {
            name: 'showFormView',
            section: 'Behavior',
            label: 'Display current form view',
            type: 'boolean',
        },
        {
            name: 'omitHeaderOptions',
            section: 'Behavior',
            label: 'Omit header options icon',
            type: 'boolean',
        },
    ],
    angularProviders: [
        'cf2feedeff52321020d2333663e97267',
        '06e836f0d722120023c84f80de6103a1',
        '8a8862dd97ac2910b2e1f97e6253af7c',
    ],
})
