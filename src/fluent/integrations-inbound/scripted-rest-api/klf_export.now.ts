import { Record, RestApi } from '@servicenow/sdk/core'

RestApi({
    $id: Now.ID['e40c27068374c7103c9299e0deaad37c'],
    name: 'KLF Export',
    serviceId: 'klf_export',
    routes: [
        {
            $id: Now.ID['045dd71783fc03503c9299e0deaad3a8'],
            name: 'Scope Users',
            consumes: 'application/json,application/xml,text/xml',
            method: 'POST',
            script: Now.include('./klf_export.scope_users.server.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/scope_users',
            enforceAcl: [],
            version: 1,
        },
        {
            $id: Now.ID['0f903ed483850b503c9299e0deaad30e'],
            name: 'Get Group Mapping',
            consumes: 'application/json,application/xml,text/xml',
            method: 'POST',
            script: Now.include('./klf_export.get_group_mapping.server.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/get_group_mapping',
            enforceAcl: [],
            version: 1,
        },
        {
            $id: Now.ID['4067ab1d834903903c9299e0deaad388'],
            name: 'Table Info',
            consumes: 'application/json,application/xml,text/xml',
            method: 'POST',
            script: Now.include('./klf_export.table_info.server.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/table_info',
            enforceAcl: [],
            version: 1,
        },
        {
            $id: Now.ID['46c75fc783fc8f103c9299e0deaad3e0'],
            name: 'Table Groups',
            consumes: 'application/json,application/xml,text/xml',
            method: 'POST',
            script: Now.include('./klf_export.table_groups.server.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/table_groups',
            enforceAcl: [],
            version: 1,
        },
        {
            $id: Now.ID['4776170c83c987503c9299e0deaad335'],
            name: 'Set User Mapping',
            consumes: 'application/json,application/xml,text/xml',
            method: 'POST',
            script: Now.include('./klf_export.set_user_mapping.server.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/set_user_mapping',
            enforceAcl: [],
            version: 1,
        },
        {
            $id: Now.ID['51ac6b468374c7103c9299e0deaad36f'],
            name: 'Table',
            consumes: 'application/json,application/xml,text/xml',
            method: 'POST',
            script: Now.include('./klf_export.table.server.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/table',
            enforceAcl: [],
            version: 1,
        },
        {
            $id: Now.ID['75207e9483850b503c9299e0deaad353'],
            name: 'Get User Mapping',
            consumes: 'application/json,application/xml,text/xml',
            method: 'POST',
            script: Now.include('./klf_export.get_user_mapping.server.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/get_user_mapping',
            enforceAcl: [],
            version: 1,
        },
        {
            $id: Now.ID['8cdcd7d383fc03503c9299e0deaad36c'],
            name: 'Table Users',
            consumes: 'application/json,application/xml,text/xml',
            method: 'POST',
            script: Now.include('./klf_export.table_users.server.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/table_users',
            enforceAcl: [],
            version: 1,
        },
        {
            $id: Now.ID['c127145b8330cf103c9299e0deaad343'],
            name: 'Scope Groups',
            consumes: 'application/json,application/xml,text/xml',
            method: 'POST',
            script: Now.include('./klf_export.scope_groups.server.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/scope_groups',
            enforceAcl: [],
            version: 1,
        },
        {
            $id: Now.ID['d3768c44838147503c9299e0deaad382'],
            name: 'Set Group Mapping',
            consumes: 'application/json,application/xml,text/xml',
            method: 'POST',
            script: Now.include('./klf_export.set_group_mapping.server.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/set_group_mapping',
            enforceAcl: [],
            version: 1,
        },
    ],
    versions: [
        {
            $id: Now.ID['829c67468374c7103c9299e0deaad32f'],
            isDefault: true,
            version: 1,
        },
    ],
})

Record({
    $id: Now.ID['1f7d971783fc03503c9299e0deaad39a'],
    table: 'sys_es_latest_script',
    data: { id: '045dd71783fc03503c9299e0deaad3a8', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['b8b03ed483850b503c9299e0deaad38e'],
    table: 'sys_es_latest_script',
    data: { id: '0f903ed483850b503c9299e0deaad30e', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['a8d72b5d834903903c9299e0deaad3fc'],
    table: 'sys_es_latest_script',
    data: { id: '4067ab1d834903903c9299e0deaad388', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['34f95b4783fc8f103c9299e0deaad3dd'],
    table: 'sys_es_latest_script',
    data: { id: '46c75fc783fc8f103c9299e0deaad3e0', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['e6a6570c83c987503c9299e0deaad3dd'],
    table: 'sys_es_latest_script',
    data: { id: '4776170c83c987503c9299e0deaad335', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['d9cc2f468374c7103c9299e0deaad339'],
    table: 'sys_es_latest_script',
    data: { id: '51ac6b468374c7103c9299e0deaad36f', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['258072d483850b503c9299e0deaad35b'],
    table: 'sys_es_latest_script',
    data: { id: '75207e9483850b503c9299e0deaad353', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['214dd3d783b803503c9299e0deaad382'],
    table: 'sys_es_latest_script',
    data: { id: '8cdcd7d383fc03503c9299e0deaad36c', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['aa47185383f4cf103c9299e0deaad322'],
    table: 'sys_es_latest_script',
    data: { id: 'c127145b8330cf103c9299e0deaad343', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['ada7ccc4838147503c9299e0deaad36b'],
    table: 'sys_es_latest_script',
    data: { id: 'd3768c44838147503c9299e0deaad382', table: 'sys_ws_operation', use_es_latest: 'true' },
})
