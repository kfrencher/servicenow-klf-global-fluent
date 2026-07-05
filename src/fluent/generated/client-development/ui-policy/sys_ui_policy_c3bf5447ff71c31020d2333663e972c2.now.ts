import { UiPolicy } from '@servicenow/sdk/core'

UiPolicy({
    $id: Now.ID['c3bf5447ff71c31020d2333663e972c2'],
    table: 'u_klf_recordimporter_state',
    shortDescription: 'KLFSTATE Show Transform Position',
    isolateScript: true,
    conditions: 'u_state=transforming^ORu_state=complete^EQ',
    actions: [
        {
            field: 'u_transform_position',
            visible: true,
            readOnly: true,
            table: 'u_klf_recordimporter_state',
        },
    ],
})
