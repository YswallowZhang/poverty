const Mysql = require('mysql-pro');


const conn = new Mysql({
    mysql : {
        host     : 'localhost',
        port     : '3306',
        user     : 'root',
        password : '111003qwertyuiop',
        database : 'support',
        charset  : 'UTF8_GENERAL_CI'
    }
});

module.exports = conn;
