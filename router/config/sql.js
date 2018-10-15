"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
const index_1 = require("./index");
const pool = mysql.createPool(index_1.mysqlConfig);
let sqlFn;
sqlFn = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err);
            }
            else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};
exports.default = sqlFn;
//# sourceMappingURL=sql.js.map