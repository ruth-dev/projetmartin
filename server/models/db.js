var mysql = require('mysql')

var con = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'martincarles'
});

con.connect(function(err) {
    if (err) throw err
});

module.exports = con