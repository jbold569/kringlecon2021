var mysql = require('mysql');

function createCon(){
    var connection  = mysql.createPool({
        connectionLimit: 4000,
        queueLimit: 3000,
        host: '127.0.0.1',
        user: 'encontact',
        password: '123',
        database: 'encontact',
        port: 3306,
        insecureAuth: false
    });

    return connection;
}

module.exports = createCon;
