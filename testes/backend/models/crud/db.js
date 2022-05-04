const mysql = require('mysql2/promise');

var pool = mysql.createPool({
    host: '185.211.7.52',
    user: 'u268200671_ccleo',
    password: 'Sahali1!',
    database: 'u268200671_login'
});

module.exports = pool;