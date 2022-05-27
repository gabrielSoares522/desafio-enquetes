var mysql = require('mysql');
const {databaseConfig} = require('../config/databaseConfig');

var pool = mysql.createPool(databaseConfig);

exports.executeQuery = function (sql, params) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, params, function (err, results) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    });
};

exports.pool = pool;