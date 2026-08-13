import { Property } from '@servicenow/sdk/core'

Property({
    $id: Now.ID['ec9cde01ff8ec31020d2333663e972f7'],
    name: 'KLF_RecordExporterService.credential_validation_endpoint_path',
    value: '/api/now/table/sys_user?sysparm_limit=1',
    description:
        'The source system endpoint path to use to validate the credentials passed to the KLF_RecordExporterService are valid',
    isPrivate: true,
    ignoreCache: true,
})
