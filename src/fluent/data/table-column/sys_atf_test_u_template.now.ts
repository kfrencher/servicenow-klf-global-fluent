import { Table, BooleanColumn } from '@servicenow/sdk/core'

export const sys_atf_test = Table({
    augments: 'sys_atf_test',
    schema: {
        u_template: BooleanColumn({
            label: 'Template',
            maxLength: 40,
        }),
    },
})
