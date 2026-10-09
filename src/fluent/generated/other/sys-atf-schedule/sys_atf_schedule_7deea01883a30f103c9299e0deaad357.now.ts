import { Record } from "@servicenow/sdk/core";

Record({
    $id: Now.ID['7deea01883a30f103c9299e0deaad357'],
    table: 'sys_atf_schedule',
    data: {
    active: 'true',
    advanced: 'false',
    conditional: 'false',
    description: `This schedule will perform the following actions:

Run suite 'KLF Global' on a system with this configuration:
Any browser on any version
Any operating system on any version`,
    name: 'CICD adhoc schedule',
    offset_type: '0',
    performance_test: 'false',
    run_as: '6816f79cc0a8016401c5a33be04be441',
    run_dayofmonth: '1',
    run_in_cloud: 'false',
    run_start: '2026-09-21 10:55:27',
    run_type: 'on_demand',
    script: 'new global.ScheduledTestProcessor().executeScheduledSuites(\'7deea01883a30f103c9299e0deaad357\');',
    upgrade_safe: 'false'
}
})
