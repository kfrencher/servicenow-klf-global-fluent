/**
 * @typedef {{
 * name: string,
 * table: string
 * }} KLF_Password2Field
 */

/**
 * @namespace KLF_Password2Inspector
 * @description Utility to inspect the instance for usage of password2 fields
 * @example
 * // Find and display password2 data in the instance
 * KLF_Password2Inspector.findPassword2Data();
 * 
 * // Check the entire instance for password2 data
 * var result = KLF_Password2Inspector.checkInstanceForPassword2Data(true);
 * gs.info('KLF_Password2Inspector: Instance has password2 data: ' + JSON.stringify(result, null, 4));
 * gs.info('Table names with password2 data:\n\n' + Object.keys(result).join('\n'));
 * 
 * // Find records in a specific table with password2 data
 * var data = KLF_Password2Inspector.findRecordsWithPassword2Data('discovery_credentials', 10);
 * gs.info('KLF_Password2Inspector: Records in discovery_credentials with password2 data:\n\n' + data.join('\n'));
 */
var KLF_Password2Inspector = (function() {
    return {
        /**
         * @param {string} tableName
         * @returns {KLF_Password2Field[]}
         */
        findPassword2FieldsByTable: function(tableName) {
            var fields = /** @type {KLF_Password2Field[]} */ ([]);

            var tableGr = new GlideRecord('sys_dictionary');
            tableGr.addQuery('name', tableName);
            tableGr.addQuery('internal_type', 'password2');
            tableGr.query();

            while (tableGr.next()) {
                fields.push({
                    name: tableGr.getValue('element'),
                    table: tableGr.getValue('name')
                });
            }

            return fields;
        },

        /**
         * @returns {string[]}
         */
        findTablesWithPassword2Fields: function() {
            var tables = /** @type {string[]} */ ([]);

            var tableGa = new GlideAggregate('sys_dictionary');
            tableGa.groupBy('name');
            tableGa.addQuery('sys_class_name', 'sys_dictionary');
            tableGa.addQuery('internal_type', 'password2');
            tableGa.addAggregate('COUNT');
            tableGa.addHaving('COUNT', '>', 0);
            tableGa.query();

            while (tableGa.next()) {
                tables.push(tableGa.getValue('name'));
            }

            return tables;
        },

        /**
         * Looks up the associated password2 fields for the list of tables
         * @param {string[]} tables
         * @returns {{[tableName:string]:string[]}}
         */
        getTableToPassword2FieldMap: function(tables) {
            var me = this;
            return tables.reduce(function(tableToFields, table) {
                var fields = me.findPassword2FieldsByTable(table);
                tableToFields[table] = fields.map(function(field) {
                    return field.name;
                });
                return tableToFields;
            }, /** @type {{[tableName:string]:string[]}} */ ({}));
        },

        /**
         * @param {string} tableName
         * @param {string[]} fields
         * @returns {boolean}
         */
        _doesTableHavePassword2Data: function(tableName, fields) {
            if (fields.length === 0) {
                return false;
            }

            var glideRecord = new GlideRecord(tableName);
            var _fields = Array.from(fields);
            var firstField = /** @type {string} */ (_fields.pop());
            var query = glideRecord.addQuery(firstField, '!=', '');
            _fields.reduce(function(q, field) {
                return q.addOrCondition(field, '!=', '');
            }, query);

            glideRecord.setLimit(1);
            glideRecord.query();
            return glideRecord.hasNext();
        },

        /**
         * @param {{[tableName:string]:string[]}} tableToFields
         * @returns {{[tableName:string]:boolean}}
         */
        checkTablesForPassword2Data: function(tableToFields) {
            var me = this;
            var result = /** @type {{[tableName:string]:boolean}} */ ({});
            Object.keys(tableToFields).forEach(function(tableName) {
                var fields = tableToFields[tableName];
                result[tableName] = me._doesTableHavePassword2Data(tableName, fields);
            });
            return result;
        },

        /**
         * Returns a map of table names to boolean indicating if that table has any records with password2 data
         * @param {boolean} positiveOnly If true, only tables with password2 data will be returned
         * @returns {{[tableName:string]:boolean}}
         */
        checkInstanceForPassword2Data: function(positiveOnly) {
            var tables = this.findTablesWithPassword2Fields();
            var tableToFields = this.getTableToPassword2FieldMap(tables);
            var result = this.checkTablesForPassword2Data(tableToFields);

            if (positiveOnly) {
                return Object.keys(result).reduce(function(filtered, tableName) {
                    if (result[tableName]) {
                        filtered[tableName] = true;
                    }
                    return filtered;
                }, /** @type {{[tableName:string]:boolean}} */ ({}));
            } else {
                return result;
            }
        },

        /**
         * Returns a list of sys_ids of records in the specified table that have password2 data in the specified fields
         * @param {string} tableName
         * @param {number} [limit]
         * @returns {{sys_id:string, display_value:string, [field:string]:string}[]}
         */
        findRecordsWithPassword2Data: function(tableName, limit) {
            var fields = this.findPassword2FieldsByTable(tableName).map(function(field) {
                return field.name;
            });

            var records = /** @type {{sys_id:string, display_value:string, [field:string]:string}[]} */ ([]);
            if (fields.length === 0) {
                return records;
            }

            var glideRecord = new GlideRecord(tableName);
            var _fields = Array.from(fields);
            var firstField = /** @type {string} */ (_fields.pop());
            var query = glideRecord.addQuery(firstField, '!=', '');
            _fields.reduce(function(q, field) {
                return q.addOrCondition(field, '!=', '');
            }, query);

            if (limit && limit > 0) {
                glideRecord.setLimit(limit);
            }
            glideRecord.query();
            while (glideRecord.next()) {
                /** @type {{sys_id:string, display_value:string, [field:string]:string}} */
                var record = {
                    sys_id: glideRecord.getUniqueValue(),
                    display_value: glideRecord.getDisplayValue(),
                };
                fields.forEach(function(field) {
                    record[field] = glideRecord.getValue(field);
                });
                records.push(record);
            }

            return records;
        },

				/**
				 * Main function to find and log password2 data in the instance
				 */
        findPassword2Data: function() {
            var result = KLF_Password2Inspector.checkInstanceForPassword2Data(true);
            gs.info('KLF_Password2Inspector: Instance has password2 data: ' + JSON.stringify(result, null, 4));
            var tableNames = Object.keys(result);
            gs.info('KLF_Password2Inspector: Tables with password2 data:\n\n' + tableNames.join('\n') + '\n');

            tableNames.forEach(function(tableName) {
                var data = KLF_Password2Inspector.findRecordsWithPassword2Data(tableName, 10);
                gs.info('KLF_Password2Inspector: Records in "' + tableName + '" with password2 data:\n\n' + JSON.stringify(data, null, 4));
            });

        }

    };
})();