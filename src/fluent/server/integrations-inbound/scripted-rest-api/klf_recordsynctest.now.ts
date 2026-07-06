import { RestApi } from '@servicenow/sdk/core'

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
            script: Now.include('./sys_ws_operation_13d6f1984710961058ceeb02d16d4396.js'),
            produces: 'application/json,application/xml,text/xml',
            path: '/clean',
        },
    ],
})
