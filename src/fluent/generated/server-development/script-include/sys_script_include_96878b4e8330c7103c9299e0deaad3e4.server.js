/**
 * Configuration object for the KLF_RecordSync class
 * @typedef KLF_RecordExportServiceConnectionConfig
 * @property {string} instanceUrl
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef {{
 * tableName: string,
 * rowCount: number
 * }} KLF_TableInfo
 */

/**
 * @typedef {{
 * tableName: string,
 * encodedQueryString?: string,
 * excludedTables?: string[],
 * window?: {start:number, end:number},
 * scopeName?: string,
 * skipMapping?: boolean
 * }} KLF_ExportTableOptions
 */

//@ts-ignore
var global = global || {};

global.KLF_RecordExporterService = (function() {
    const LOG_SOURCE = 'KLF_RecordExporterService';
    const LOG_PREFIX = `[${LOG_SOURCE}] - `;
    const ENDPOINT = {
        EXPORT_TABLE: '/api/global/v1/klf_export/table',
        TABLE_GROUPS: '/api/global/v1/klf_export/table_groups',
        SCOPE_GROUPS: '/api/global/v1/klf_export/scope_groups',
        TABLE_USERS: '/api/global/v1/klf_export/table_users',
        SCOPE_USERS: '/api/global/v1/klf_export/scope_users',
        SET_GROUP_MAPPING: '/api/global/v1/klf_export/set_group_mapping',
        SET_USER_MAPPING: '/api/global/v1/klf_export/set_user_mapping',
        GET_GROUP_MAPPING: '/api/global/v1/klf_export/get_group_mapping',
        GET_USER_MAPPING: '/api/global/v1/klf_export/get_user_mapping',
        TABLE_INFO: '/api/global/v1/klf_export/table_info'
    };

    return class {

        /**
         * @param {KLF_RecordExportServiceConnectionConfig} connectionConfig 
         */
        constructor(connectionConfig) {
            this.connectionConfig = connectionConfig;
        }

        /**
         * @param {string} message 
         */
        logInfo(message) {
            gs.log(`${LOG_PREFIX}${message}`, LOG_SOURCE);
        }

        /**
         * @param {string} message 
         */
        logError(message) {
            gs.logError(`${LOG_PREFIX}${message}`, LOG_SOURCE);
        }

        /**
         * @param {string} endpointPath
         * @param {string} payload
         * @returns {{success:boolean, responseBody:string}}
         */
        _sendToRemoteInstance(endpointPath, payload) {
            const request = this._createRestMessage(endpointPath);
            request.setHttpMethod('POST');
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestBody(payload);
            const response = request.execute();
            if (response.getStatusCode() != 200) {
                this.logError('Request failed');
                this.logError('Received status code: ' + response.getStatusCode());
                this.logError('Received body: ' + response.getBody());
                return {
                    success: false,
                    responseBody: response.getBody()
                };
            }

            const responseBody = response.getBody();

            return {
                success: true,
                responseBody: responseBody
            };

        }

        /**
         * Returns a sn_ws.RESTMessageV2 object that is configured to make a request to the target instance
         * @param {string} endpointPath
         * @returns {sn_ws.RESTMessageV2}
         */
        _createRestMessage(endpointPath) {
            const request = new sn_ws.RESTMessageV2();
            request.setRequestHeader("Accept", "application/json");
            const authHeader = 'Basic ' + GlideStringUtil.base64Encode(this.connectionConfig.username + ':' + this.connectionConfig.password);
            request.setRequestHeader('Authorization', authHeader);
            // Do not use setBasicAuth. This does not work with mutual auth for some reason
            // request.setBasicAuth(this.connectionConfig.username, this.connectionConfig.password);
            request.setEndpoint(this.connectionConfig.instanceUrl + endpointPath);
            return request;
        }

        /**
         * @param {KLF_ExportTableOptions[]} options 
         * @returns {KLF_TableInfo[]}
         */
        getTableInfo(options) {
            const response = this._sendToRemoteInstance(ENDPOINT.TABLE_INFO, JSON.stringify(options, null, 4));
            if (response.success) {
                try {
                    /** @type {KLF_TableInfo[]} */
                    const tableInfos = JSON.parse(response.responseBody).result;
                    tableInfos.sort((a, b) => a.rowCount - b.rowCount);
                    return tableInfos;
                } catch (e) {
                    this.logError('Failed to parse response: ' + response.responseBody);
                }
            } else {
                this.logError('getTableInfo request to endpoint failed');
            }

            return [];
        }

        /**
         * Exports records from a specified table based on a query string, optionally excluding certain tables and mapping user and group fields.
         * @param {KLF_ExportTableOptions} options
         * @returns {KLF_ExportTableResponse} 
         */
        exportTable(options) {
            const response = this._sendToRemoteInstance(ENDPOINT.EXPORT_TABLE, JSON.stringify(options, null, 4));
            if (response.success) {
                try {
                    return JSON.parse(response.responseBody).result;
                } catch (e) {
                    this.logError('Failed to parse response: ' + response.responseBody);
                }
            } else {
                this.logError('exportTable request to endpoint failed');
            }

            return {
                window: null,
                latestUpdatedOn: null,
                pageSize: 0,
                totalRecords: 0,
                records: []
            };
        }

        /**
         * Finds all the unique groups that are referenced in a scope by using the group fields
         * that are returned from {@link GroupUtils.getGroupFields}
         * @param {string} scope
         * @returns {KLF_RecordSync_RemoteGroup[]} The unique group sys_ids
         */
        getUniqueGroupsInScope(scope) {
            const options = {
                scope: scope
            };

            const response = this._sendToRemoteInstance(ENDPOINT.SCOPE_GROUPS, JSON.stringify(options, null, 4));
            if (response.success) {
                try {
                    return JSON.parse(response.responseBody).result;
                } catch (e) {
                    this.logError('Failed to parse response: ' + response.responseBody);
                }
            } else {
                this.logError('getUniqueGroupsInScope request to endpoint failed');
            }

            return [];
        }

        /**
         * Finds all the unique groups that are referenced in a table by using the group fields
         * that are returned from {@link GroupUtils.getGroupFields}
         * @param {string} tableName
         * @param {string} [filter] GlideRecord encoded query
         * @returns {KLF_RecordSync_RemoteGroup[]} The unique group sys_ids
         */
        getUniqueGroupsInTable(tableName, filter) {
            const options = {
                tableName: tableName,
                encodedQueryString: filter
            };

            const response = this._sendToRemoteInstance(ENDPOINT.TABLE_GROUPS, JSON.stringify(options, null, 4));
            if (response.success) {
                try {
                    return JSON.parse(response.responseBody).result;
                } catch (e) {
                    this.logError('Failed to parse response: ' + response.responseBody);
                }
            } else {
                this.logError('getUniqueGroupsInTable request to endpoint failed');
            }

            return [];
        }

        /**
         * Finds all the unique users that are referenced in a scope by using the user fields
         * that are returned from {@link UserUtils.getUserFields}
         * @param {string} scope
         * @returns {KLF_RecordSync_RemoteUser[]} The unique user sys_ids
         */
        getUniqueUsersInScope(scope) {
            const options = {
                scope: scope
            };

            const response = this._sendToRemoteInstance(ENDPOINT.SCOPE_USERS, JSON.stringify(options, null, 4));
            if (response.success) {
                try {
                    return JSON.parse(response.responseBody).result;
                } catch (e) {
                    this.logError('Failed to parse response: ' + response.responseBody);
                }
            } else {
                this.logError('getUniqueUsersInScope request to endpoint failed');
            }

            return [];
        }

        /**
         * Finds all the unique users that are referenced in a table by using the user fields
         * that are returned from {@link UserUtils.getUserFields}
         * @param {string} tableName
         * @param {string} [filter] GlideRecord encoded query
         * @returns {KLF_RecordSync_RemoteUser[]} The unique user sys_ids
         */
        getUniqueUsersInTable(tableName, filter) {
            const options = {
                tableName: tableName,
                encodedQueryString: filter
            };

            const response = this._sendToRemoteInstance(ENDPOINT.TABLE_USERS, JSON.stringify(options, null, 4));
            if (response.success) {
                try {
                    return JSON.parse(response.responseBody).result;
                } catch (e) {
                    this.logError('Failed to parse response: ' + response.responseBody);
                }
            } else {
                this.logError('getUniqueUsersInTable request to endpoint failed');
            }

            return [];
        }

        /**
         * @param {string} scopeName
         * @returns {KLF_RecordSync_GroupMapping | null}
         */
        getGroupMapping(scopeName) {
            const options = {
                scopeName: scopeName
            };

            const response = this._sendToRemoteInstance(ENDPOINT.GET_GROUP_MAPPING, JSON.stringify(options, null, 4));
            if (response.success) {
                try {
                    /** @type {KLF_RecordSync_GroupMapping} */
                    const groupMapping = JSON.parse(response.responseBody).result;
                    // If there is no mapping, the response will be 200 with an empty body. Handle this case by returning null
                    if (!groupMapping.mapping) {
                        return null;
                    }
                    return groupMapping;
                } catch (e) {
                    this.logError('Failed to parse group mapping response: ' + response.responseBody);
                }
            } else {
                this.logError('getGroupMapping request to endpoint failed');
            }

            return null;
        }

        /**
         * @param {string} scopeName
         * @returns {KLF_RecordSync_UserMapping | null}
         */
        getUserMapping(scopeName) {
            const options = {
                scopeName: scopeName
            };

            const response = this._sendToRemoteInstance(ENDPOINT.GET_USER_MAPPING, JSON.stringify(options, null, 4));
            if (response.success) {
                try {
                    /** @type {KLF_RecordSync_UserMapping} */
                    const userMapping = JSON.parse(response.responseBody).result;
                    // If there is no mapping, the response will be 200 with an empty body. Handle this case by returning null
                    if (!userMapping.mapping) {
                        return null;
                    }
                    return userMapping;
                } catch (e) {
                    this.logError('Failed to parse user mapping response: ' + response.responseBody);
                }
            } else {
                this.logError('Failed to get user mapping');
            }

            return null;
        }

        /**
         * @param {string} scopeName
         * @param {KLF_RecordSync_GroupMapping} groupMapping 
         */
        setGroupMapping(scopeName, groupMapping) {
            const options = {
                scopeName: scopeName,
                groupMapping: groupMapping
            };

            const response = this._sendToRemoteInstance(ENDPOINT.SET_GROUP_MAPPING, JSON.stringify(options, null, 4));
            if (!response.success) {
                this.logError('Failed to set group mapping');
            } else {
                this.logInfo('Successfully set group mapping');
            }
        }

        /**
         * @param {string} scopeName
         * @param {KLF_RecordSync_UserMapping} userMapping 
         */
        setUserMapping(scopeName, userMapping) {
            const options = {
                scopeName: scopeName,
                userMapping: userMapping
            };

            const response = this._sendToRemoteInstance(ENDPOINT.SET_USER_MAPPING, JSON.stringify(options, null, 4));
            if (!response.success) {
                this.logError('Failed to set user mapping');
            } else {
                this.logInfo('Successfully set user mapping');
            }
        }
    };
})();