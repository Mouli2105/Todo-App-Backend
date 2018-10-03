const mysql = require('mysql')

class MySQL {
    constructor() {
        if (! MySQL.instance) {
            this.connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'todo_app'
            })
            MySQL.instance = this
        }
        return MySQL.instance
    }
}

const db = new MySQL()
Object.freeze(db)

module.exports = db
