import { Record, RestApi } from '@servicenow/sdk/core'

RestApi({
    $id: Now.ID['d2b6fdd04710961058ceeb02d16d43f8'],
    name: 'KLF RecordSyncTest',
    serviceId: 'klf_recordsynctest',
    routes: [
        {
            $id: Now.ID['13d6f1984710961058ceeb02d16d4396'],
            name: 'Clean',
            consumes: 'application/json,application/xml,text/xml',
            method: 'DELETE',
            script: Now.include('./klf_recordsynctest.clean.server.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/clean',
        },
    ],
})

Record({
    $id: Now.ID['593739d04710961058ceeb02d16d4357'],
    table: 'sys_es_latest_script',
    data: { id: '13d6f1984710961058ceeb02d16d4396', table: 'sys_ws_operation', use_es_latest: 'true' },
})
