const mysql = require('mysql')

class MySQL {
    constructor() {
        if (! MySQL.instance) {
            this.connection = mysql.createConnection({
                host: 'my-db.cbnxekocjgm8.ap-south-1.rds.amazonaws.com',
                user: 'Mouli',
                password: 'rootuser',
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
