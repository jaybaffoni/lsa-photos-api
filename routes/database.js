var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-05.cleardb.net',
	user: 'ba15b4c9352786',
	password: '20281e54',
	database: 'heroku_55dc0289c1d239d',
})
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})
module.exports = pool