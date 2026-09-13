import { Record, RestApi } from '@servicenow/sdk/core'

RestApi({
    $id: Now.ID['7323a9159725061024d7b066f053af7c'],
    name: 'KLF Import XML',
    serviceId: 'klf_import_xml',
    shortDescription: 'Open API Spec',
    docLink: 'https://dev144209.service-now.com/sys_attachment.do?sys_id=289ee3e9972b4a5424d7b066f053af6e',
    routes: [
        {
            $id: Now.ID['137170d4477b461058ceeb02d16d43f6'],
            name: 'User Mapping',
            consumes: 'application/json',
            method: 'POST',
            script: Now.include('./klf_import_xml.user_mapping.server.js'),
            produces: 'application/json',
            path: '/user_mapping',
            shortDescription: 'Creates a group mapping based on the provided list of groups',
            requestExample: `[
    {
        "sysId": "019ad92ec7230010393d265c95c260dd",
        "name": "Analytics Settings Managers",
        "source": null
    },
    {
        "sysId": "287ee6fea9fe198100ada7950d0b1b73",
        "name": "Database",
        "source": null
    },
    {
        "sysId": "477a05d153013010b846ddeeff7b1225",
        "name": "App Engine Admins",
        "source": null
    },
    {
        "sysId": "5dc5889a976a061024d7b066f053afa8",
        "name": "Notification Group",
        "source": null
    },
    {
        "sysId": "86cfbd5197b8461024d7b066f053af35",
        "name": "Test Group",
        "source": null
    },
    {
        "sysId": "8a5055c9c61122780043563ef53438e3",
        "name": "Hardware",
        "source": null
    },
    {
        "sysId": "b629199f97e68a1024d7b066f053af07",
        "name": "New Group PDI",
        "source": null
    },
    {
        "sysId": "6baf965b9742211024d7b066f053af9a",
        "name": "",
        "source": ""
    },
    {
        "sysId": "e3af965b9742211024d7b066f053af9c",
        "name": "",
        "source": ""
    },
    {
        "sysId": "testing if this works",
        "name": "",
        "source": ""
    },
    {
        "sysId": "6a42f4616fc331003b3c498f5d3ee46f",
        "name": "",
        "source": ""
    }
]`,
            version: 1,
        },
        {
            $id: Now.ID['2163ed159725061024d7b066f053aff2'],
            name: 'Import',
            consumes: 'application/xml',
            method: 'POST',
            script: Now.include('./klf_import_xml.import.server.js'),
            produces: 'application/json',
            shortDescription: 'Imports records using the same format as export XML',
            requestExample: `<?xml version="1.0" encoding="UTF-8"?>
<xml>
    <incident>
        <active>true</active>
        <activity_due>2024-06-15 12:53:44</activity_due>
        <additional_assignee_list />
        <approval>not requested</approval>
        <approval_history />
        <approval_set />
        <assigned_to display_value="beth.anglin">46d44a23a9fe19810012d100cca80666</assigned_to>
        <assignment_group display_value="Hardware" name="Hardware">8a5055c9c61122780043563ef53438e3</assignment_group>
        <business_duration />
        <business_impact />
        <business_service />
        <business_stc />
        <calendar_duration />
        <calendar_stc />
        <caller_id display_value="jerrod.bennett">5b7c200d0a640069006b3845b5d0fa7c</caller_id>
        <category>inquiry</category>
        <cause />
        <caused_by />
        <child_incidents />
        <close_code />
        <close_notes />
        <closed_at />
        <closed_by />
        <cmdb_ci display_value="EXCH-SD-05">281190e3c0a8000b003f593aa3f20ca6</cmdb_ci>
        <comments />
        <comments_and_work_notes />
        <company display_value="ACME North America">31bea3d53790200044e0bfc8bcbe5dec</company>
        <contact_type>phone</contact_type>
        <contract />
        <correlation_display />
        <correlation_id />
        <delivery_plan />
        <delivery_task />
        <description>Can't connect to Exchange. Login credentials and network connection are working
            though.</description>
        <due_date />
        <escalation>0</escalation>
        <expected_start />
        <follow_up />
        <group_list />
        <hold_reason />
        <impact>1</impact>
        <incident_state>2</incident_state>
        <knowledge>false</knowledge>
        <location display_value="San Diego">108752c8c611227501d4ab0e392ba97f</location>
        <made_sla>true</made_sla>
        <notify>1</notify>
        <number>INC0000050</number>
        <opened_at>2023-02-20 21:58:24</opened_at>
        <opened_by display_value="">glide.maint</opened_by>
        <order />
        <origin_id />
        <origin_table />
        <parent />
        <parent_incident />
        <priority>1</priority>
        <problem_id />
        <reassignment_count>0</reassignment_count>
        <rejection_goto />
        <reopen_count />
        <reopened_by />
        <reopened_time />
        <resolved_at />
        <resolved_by />
        <rfc />
        <route_reason />
        <service_offering />
        <severity>3</severity>
        <short_description>Can't access Exchange server - is it down?</short_description>
        <skills />
        <sla_due>2024-10-23 05:58:24</sla_due>
        <state>2</state>
        <subcategory />
        <sys_class_name>incident</sys_class_name>
        <sys_created_by>glide.maint</sys_created_by>
        <sys_created_on>2023-02-20 18:05:40</sys_created_on>
        <sys_domain>global</sys_domain>
        <sys_domain_path>/</sys_domain_path>
        <sys_id>ef43c6d40a0a0b5700c77f9bf387afe3</sys_id>
        <sys_mod_count>2461</sys_mod_count>
        <sys_updated_by>system</sys_updated_by>
        <sys_updated_on>2024-06-15 10:53:45</sys_updated_on>
        <task_effective_number>INC0000050</task_effective_number>
        <time_worked />
        <universal_request />
        <upon_approval>proceed</upon_approval>
        <upon_reject>cancel</upon_reject>
        <urgency>1</urgency>
        <user_input />
        <variables />
        <watch_list />
        <wf_activity />
        <work_end />
        <work_notes />
        <work_notes_list />
        <work_start />
    </incident>
</xml>`,
            version: 1,
        },
        {
            $id: Now.ID['3ac310f997ae421024d7b066f053af43'],
            name: 'Notifications',
            consumes: 'application/json',
            method: 'POST',
            script: Now.include('./klf_import_xml.notifications.server.js'),
            produces: 'application/json',
            path: '/notifications',
            version: 1,
        },
        {
            $id: Now.ID['655beaab47fb421058ceeb02d16d4341'],
            name: 'Roles',
            script: Now.include('./klf_import_xml.roles.get.server.js'),
            produces: 'application/json',
            path: '/roles',
            parameters: [
                {
                    $id: Now.ID['aa5b387347f7821058ceeb02d16d433c'],
                    name: 'roleNames',
                    required: true,
                    exampleValue: 'itil,pa_viewer,report_editor',
                    shortDescription: 'A comma concatenated list of role names',
                },
            ],
            version: 1,
            consumes: 'application/json,application/xml,text/xml',
        },
        {
            $id: Now.ID['6a3c34b347f7821058ceeb02d16d438e'],
            name: 'Roles',
            consumes: 'application/json',
            method: 'POST',
            script: Now.include('./klf_import_xml.roles.post.server.js'),
            produces: 'application/json',
            path: '/roles',
            version: 1,
        },
        {
            $id: Now.ID['9fbb75a99762421024d7b066f053af23'],
            name: 'Group Mapping',
            consumes: 'application/json',
            method: 'POST',
            script: Now.include('./klf_import_xml.group_mapping.server.js'),
            produces: 'application/json',
            path: '/group_mapping',
            shortDescription: 'Creates a group mapping based on the provided list of groups',
            requestExample: `[
    {
        "sysId": "019ad92ec7230010393d265c95c260dd",
        "name": "Analytics Settings Managers",
        "source": null
    },
    {
        "sysId": "287ee6fea9fe198100ada7950d0b1b73",
        "name": "Database",
        "source": null
    },
    {
        "sysId": "477a05d153013010b846ddeeff7b1225",
        "name": "App Engine Admins",
        "source": null
    },
    {
        "sysId": "5dc5889a976a061024d7b066f053afa8",
        "name": "Notification Group",
        "source": null
    },
    {
        "sysId": "86cfbd5197b8461024d7b066f053af35",
        "name": "Test Group",
        "source": null
    },
    {
        "sysId": "8a5055c9c61122780043563ef53438e3",
        "name": "Hardware",
        "source": null
    },
    {
        "sysId": "b629199f97e68a1024d7b066f053af07",
        "name": "New Group PDI",
        "source": null
    },
    {
        "sysId": "6baf965b9742211024d7b066f053af9a",
        "name": "",
        "source": ""
    },
    {
        "sysId": "e3af965b9742211024d7b066f053af9c",
        "name": "",
        "source": ""
    },
    {
        "sysId": "testing if this works",
        "name": "",
        "source": ""
    },
    {
        "sysId": "6a42f4616fc331003b3c498f5d3ee46f",
        "name": "",
        "source": ""
    }
]`,
            version: 1,
        },
        {
            $id: Now.ID['c42a90ab971eca1424d7b066f053af2f'],
            name: 'Validate Manifest',
            consumes: 'application/json',
            method: 'POST',
            script: Now.include('./klf_import_xml.validate_manifest.server.js'),
            produces: 'application/json',
            path: '/validate_manifest',
            shortDescription: 'Validates that the records in the provided manifest exist in the local instance',
            requestExample: `{
    "change_request": [
        "1766f1de47410200e90d87e8dee490f6",
        "46e9b4afa9fe198101026e122b85f442",
        "543a39de47410200e90d87e8dee4908a",
        "5d77b8da47410200e90d87e8dee49040",
        "70ad699e47410200e90d87e8dee4907d",
        "7b77f5de47410200e90d87e8dee490b8",
        "892eb11247810200e90d87e8dee4908f",
        "9d41c061c611228700edc88b231ec47c",
        "aa0ad55147810200e90d87e8dee490e1",
        "b0e8555147810200e90d87e8dee4902c"
    ],
    "incident": [
        "1c741bd70b2322007518478d83673af3",
        "1c832706732023002728660c4cf6a7b9",
        "46b66a40a9fe198101f243dfbc79033d",
        "46b9490da9fe1981003c938dab89bda3",
        "46c03489a9fe19810148cd5b8cbf501e",
        "46c88ac1a9fe1981014de1c831fbcf6d",
        "46cebb88a9fe198101aee93734f9768b",
        "46e18c0fa9fe19810066a0083f76bd56",
        "46ee0924a9fe198100f1cf78c198454a",
        "46ee8c2fa9fe198100623592c70d643e"
    ]
}`,
            version: 1,
        },
    ],
    versions: [
        {
            $id: Now.ID['8e1539e9976f0a5424d7b066f053af48'],
            isDefault: true,
            version: 1,
        },
    ],
})

Record({
    $id: Now.ID['klf-import-xml-user-mapping-es-latest'],
    table: 'sys_es_latest_script',
    data: { id: '137170d4477b461058ceeb02d16d43f6', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['klf-import-xml-import-es-latest'],
    table: 'sys_es_latest_script',
    data: { id: '2163ed159725061024d7b066f053aff2', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['655b6e6f47bb421058ceeb02d16d4316'],
    table: 'sys_es_latest_script',
    data: { id: '3ac310f997ae421024d7b066f053af43', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['dafcaa2747fb421058ceeb02d16d43b3'],
    table: 'sys_es_latest_script',
    data: { id: '655beaab47fb421058ceeb02d16d4341', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['3dbff8f347f7821058ceeb02d16d43ee'],
    table: 'sys_es_latest_script',
    data: { id: '6a3c34b347f7821058ceeb02d16d438e', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['klf-import-xml-group-mapping-es-latest'],
    table: 'sys_es_latest_script',
    data: { id: '9fbb75a99762421024d7b066f053af23', table: 'sys_ws_operation', use_es_latest: 'true' },
})
Record({
    $id: Now.ID['klf-import-xml-validate-manifest-es-latest'],
    table: 'sys_es_latest_script',
    data: { id: 'c42a90ab971eca1424d7b066f053af2f', table: 'sys_ws_operation', use_es_latest: 'true' },
})
