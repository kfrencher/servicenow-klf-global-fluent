import { RestApi } from '@servicenow/sdk/core'

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
            script: Now.include('./sys_ws_operation_137170d4477b461058ceeb02d16d43f6.js'),
            produces: 'application/json',
            path: '/user_mapping',
            shortDescription: 'Creates a group mapping based on the provided list of groups',
            requestExample: `[\r
    {\r
        "sysId": "019ad92ec7230010393d265c95c260dd",\r
        "name": "Analytics Settings Managers",\r
        "source": null\r
    },\r
    {\r
        "sysId": "287ee6fea9fe198100ada7950d0b1b73",\r
        "name": "Database",\r
        "source": null\r
    },\r
    {\r
        "sysId": "477a05d153013010b846ddeeff7b1225",\r
        "name": "App Engine Admins",\r
        "source": null\r
    },\r
    {\r
        "sysId": "5dc5889a976a061024d7b066f053afa8",\r
        "name": "Notification Group",\r
        "source": null\r
    },\r
    {\r
        "sysId": "86cfbd5197b8461024d7b066f053af35",\r
        "name": "Test Group",\r
        "source": null\r
    },\r
    {\r
        "sysId": "8a5055c9c61122780043563ef53438e3",\r
        "name": "Hardware",\r
        "source": null\r
    },\r
    {\r
        "sysId": "b629199f97e68a1024d7b066f053af07",\r
        "name": "New Group PDI",\r
        "source": null\r
    },\r
    {\r
        "sysId": "6baf965b9742211024d7b066f053af9a",\r
        "name": "",\r
        "source": ""\r
    },\r
    {\r
        "sysId": "e3af965b9742211024d7b066f053af9c",\r
        "name": "",\r
        "source": ""\r
    },\r
    {\r
        "sysId": "testing if this works",\r
        "name": "",\r
        "source": ""\r
    },\r
    {\r
        "sysId": "6a42f4616fc331003b3c498f5d3ee46f",\r
        "name": "",\r
        "source": ""\r
    }\r
]`,
            version: 1,
        },
        {
            $id: Now.ID['2163ed159725061024d7b066f053aff2'],
            name: 'Import',
            consumes: 'application/xml',
            method: 'POST',
            script: Now.include('./sys_ws_operation_2163ed159725061024d7b066f053aff2.js'),
            produces: 'application/json',
            shortDescription: 'Imports records using the same format as export XML',
            requestExample: `<?xml version="1.0" encoding="UTF-8"?>\r
<xml>\r
    <incident>\r
        <active>true</active>\r
        <activity_due>2024-06-15 12:53:44</activity_due>\r
        <additional_assignee_list />\r
        <approval>not requested</approval>\r
        <approval_history />\r
        <approval_set />\r
        <assigned_to display_value="beth.anglin">46d44a23a9fe19810012d100cca80666</assigned_to>\r
        <assignment_group display_value="Hardware" name="Hardware">8a5055c9c61122780043563ef53438e3</assignment_group>\r
        <business_duration />\r
        <business_impact />\r
        <business_service />\r
        <business_stc />\r
        <calendar_duration />\r
        <calendar_stc />\r
        <caller_id display_value="jerrod.bennett">5b7c200d0a640069006b3845b5d0fa7c</caller_id>\r
        <category>inquiry</category>\r
        <cause />\r
        <caused_by />\r
        <child_incidents />\r
        <close_code />\r
        <close_notes />\r
        <closed_at />\r
        <closed_by />\r
        <cmdb_ci display_value="EXCH-SD-05">281190e3c0a8000b003f593aa3f20ca6</cmdb_ci>\r
        <comments />\r
        <comments_and_work_notes />\r
        <company display_value="ACME North America">31bea3d53790200044e0bfc8bcbe5dec</company>\r
        <contact_type>phone</contact_type>\r
        <contract />\r
        <correlation_display />\r
        <correlation_id />\r
        <delivery_plan />\r
        <delivery_task />\r
        <description>Can't connect to Exchange. Login credentials and network connection are working\r
            though.</description>\r
        <due_date />\r
        <escalation>0</escalation>\r
        <expected_start />\r
        <follow_up />\r
        <group_list />\r
        <hold_reason />\r
        <impact>1</impact>\r
        <incident_state>2</incident_state>\r
        <knowledge>false</knowledge>\r
        <location display_value="San Diego">108752c8c611227501d4ab0e392ba97f</location>\r
        <made_sla>true</made_sla>\r
        <notify>1</notify>\r
        <number>INC0000050</number>\r
        <opened_at>2023-02-20 21:58:24</opened_at>\r
        <opened_by display_value="">glide.maint</opened_by>\r
        <order />\r
        <origin_id />\r
        <origin_table />\r
        <parent />\r
        <parent_incident />\r
        <priority>1</priority>\r
        <problem_id />\r
        <reassignment_count>0</reassignment_count>\r
        <rejection_goto />\r
        <reopen_count />\r
        <reopened_by />\r
        <reopened_time />\r
        <resolved_at />\r
        <resolved_by />\r
        <rfc />\r
        <route_reason />\r
        <service_offering />\r
        <severity>3</severity>\r
        <short_description>Can't access Exchange server - is it down?</short_description>\r
        <skills />\r
        <sla_due>2024-10-23 05:58:24</sla_due>\r
        <state>2</state>\r
        <subcategory />\r
        <sys_class_name>incident</sys_class_name>\r
        <sys_created_by>glide.maint</sys_created_by>\r
        <sys_created_on>2023-02-20 18:05:40</sys_created_on>\r
        <sys_domain>global</sys_domain>\r
        <sys_domain_path>/</sys_domain_path>\r
        <sys_id>ef43c6d40a0a0b5700c77f9bf387afe3</sys_id>\r
        <sys_mod_count>2461</sys_mod_count>\r
        <sys_updated_by>system</sys_updated_by>\r
        <sys_updated_on>2024-06-15 10:53:45</sys_updated_on>\r
        <task_effective_number>INC0000050</task_effective_number>\r
        <time_worked />\r
        <universal_request />\r
        <upon_approval>proceed</upon_approval>\r
        <upon_reject>cancel</upon_reject>\r
        <urgency>1</urgency>\r
        <user_input />\r
        <variables />\r
        <watch_list />\r
        <wf_activity />\r
        <work_end />\r
        <work_notes />\r
        <work_notes_list />\r
        <work_start />\r
    </incident>\r
</xml>`,
            version: 1,
        },
        {
            $id: Now.ID['3ac310f997ae421024d7b066f053af43'],
            name: 'Notifications',
            consumes: 'application/json',
            method: 'POST',
            script: Now.include('./sys_ws_operation_3ac310f997ae421024d7b066f053af43.js'),
            produces: 'application/json',
            path: '/notifications',
            version: 1,
        },
        {
            $id: Now.ID['655beaab47fb421058ceeb02d16d4341'],
            name: 'Roles',
            script: Now.include('./sys_ws_operation_655beaab47fb421058ceeb02d16d4341.js'),
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
        },
        {
            $id: Now.ID['6a3c34b347f7821058ceeb02d16d438e'],
            name: 'Roles',
            consumes: 'application/json',
            method: 'POST',
            script: Now.include('./sys_ws_operation_6a3c34b347f7821058ceeb02d16d438e.js'),
            produces: 'application/json',
            path: '/roles',
            version: 1,
        },
        {
            $id: Now.ID['9fbb75a99762421024d7b066f053af23'],
            name: 'Group Mapping',
            consumes: 'application/json',
            method: 'POST',
            script: Now.include('./sys_ws_operation_9fbb75a99762421024d7b066f053af23.js'),
            produces: 'application/json',
            path: '/group_mapping',
            shortDescription: 'Creates a group mapping based on the provided list of groups',
            requestExample: `[\r
    {\r
        "sysId": "019ad92ec7230010393d265c95c260dd",\r
        "name": "Analytics Settings Managers",\r
        "source": null\r
    },\r
    {\r
        "sysId": "287ee6fea9fe198100ada7950d0b1b73",\r
        "name": "Database",\r
        "source": null\r
    },\r
    {\r
        "sysId": "477a05d153013010b846ddeeff7b1225",\r
        "name": "App Engine Admins",\r
        "source": null\r
    },\r
    {\r
        "sysId": "5dc5889a976a061024d7b066f053afa8",\r
        "name": "Notification Group",\r
        "source": null\r
    },\r
    {\r
        "sysId": "86cfbd5197b8461024d7b066f053af35",\r
        "name": "Test Group",\r
        "source": null\r
    },\r
    {\r
        "sysId": "8a5055c9c61122780043563ef53438e3",\r
        "name": "Hardware",\r
        "source": null\r
    },\r
    {\r
        "sysId": "b629199f97e68a1024d7b066f053af07",\r
        "name": "New Group PDI",\r
        "source": null\r
    },\r
    {\r
        "sysId": "6baf965b9742211024d7b066f053af9a",\r
        "name": "",\r
        "source": ""\r
    },\r
    {\r
        "sysId": "e3af965b9742211024d7b066f053af9c",\r
        "name": "",\r
        "source": ""\r
    },\r
    {\r
        "sysId": "testing if this works",\r
        "name": "",\r
        "source": ""\r
    },\r
    {\r
        "sysId": "6a42f4616fc331003b3c498f5d3ee46f",\r
        "name": "",\r
        "source": ""\r
    }\r
]`,
            version: 1,
        },
        {
            $id: Now.ID['c42a90ab971eca1424d7b066f053af2f'],
            name: 'Validate Manifest',
            consumes: 'application/json',
            method: 'POST',
            script: Now.include('./sys_ws_operation_c42a90ab971eca1424d7b066f053af2f.js'),
            produces: 'application/json',
            path: '/validate_manifest',
            shortDescription: 'Validates that the records in the provided manifest exist in the local instance',
            requestExample: `{\r
    "change_request": [\r
        "1766f1de47410200e90d87e8dee490f6",\r
        "46e9b4afa9fe198101026e122b85f442",\r
        "543a39de47410200e90d87e8dee4908a",\r
        "5d77b8da47410200e90d87e8dee49040",\r
        "70ad699e47410200e90d87e8dee4907d",\r
        "7b77f5de47410200e90d87e8dee490b8",\r
        "892eb11247810200e90d87e8dee4908f",\r
        "9d41c061c611228700edc88b231ec47c",\r
        "aa0ad55147810200e90d87e8dee490e1",\r
        "b0e8555147810200e90d87e8dee4902c"\r
    ],\r
    "incident": [\r
        "1c741bd70b2322007518478d83673af3",\r
        "1c832706732023002728660c4cf6a7b9",\r
        "46b66a40a9fe198101f243dfbc79033d",\r
        "46b9490da9fe1981003c938dab89bda3",\r
        "46c03489a9fe19810148cd5b8cbf501e",\r
        "46c88ac1a9fe1981014de1c831fbcf6d",\r
        "46cebb88a9fe198101aee93734f9768b",\r
        "46e18c0fa9fe19810066a0083f76bd56",\r
        "46ee0924a9fe198100f1cf78c198454a",\r
        "46ee8c2fa9fe198100623592c70d643e"\r
    ]\r
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
