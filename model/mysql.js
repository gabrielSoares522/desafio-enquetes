var mysql = require('mysql');
const databaseConfig = {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "enqueteDB",
    port: 3306
};

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