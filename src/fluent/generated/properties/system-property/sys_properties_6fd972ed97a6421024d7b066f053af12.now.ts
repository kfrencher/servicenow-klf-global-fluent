import { Property } from '@servicenow/sdk/core'

Property({
    $id: Now.ID['6fd972ed97a6421024d7b066f053af12'],
    name: 'KLF_RecordSync_GroupUtils.mapping',
    value: `{
    "https://abspscpov2.service-now.com/:x_53417_demo": {
        "success": true,
        "hasMissingGroups": true,
        "missingGroups": [
            "86cfbd5197b8461024d7b066f053af35",
            "6baf965b9742211024d7b066f053af9a",
            "e3af965b9742211024d7b066f053af9c",
            "testing if this works",
            "6a42f4616fc331003b3c498f5d3ee46f"
        ],
        "mapping": {
            "019ad92ec7230010393d265c95c260dd": "019ad92ec7230010393d265c95c260dd",
            "287ee6fea9fe198100ada7950d0b1b73": "287ee6fea9fe198100ada7950d0b1b73",
            "477a05d153013010b846ddeeff7b1225": "477a05d153013010b846ddeeff7b1225",
            "8a5055c9c61122780043563ef53438e3": "8a5055c9c61122780043563ef53438e3"
        }
    },
    "https://dev229555.service-now.com/:x_1234_abac": {
        "success": true,
        "hasMissingGroups": false,
        "missingGroups": [],
        "mapping": {}
    },
    "https://dev229555.service-now.com/:x_53417_demo": {
        "success": true,
        "hasMissingGroups": true,
        "missingGroups": [
            "6a42f4616fc331003b3c498f5d3ee46f"
        ],
        "mapping": {
            "8a5055c9c61122780043563ef53438e3": "8a5055c9c61122780043563ef53438e3"
        }
    },
    ":x_53417_demo": {
        "success": true,
        "hasMissingGroups": true,
        "missingGroups": [
            "6a42f4616fc331003b3c498f5d3ee46f"
        ],
        "mapping": {
            "8a5055c9c61122780043563ef53438e3": "8a5055c9c61122780043563ef53438e3"
        }
    }
}`,
    isPrivate: true,
    ignoreCache: true,
})
