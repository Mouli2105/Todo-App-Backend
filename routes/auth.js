const express = require('express')
const router = express.Router()
const db = require('../db')

// login
router.post('/login', (req, res) => {
    db.connection.query(`SELECT id, username FROM Users WHERE username=? AND password=?`, [req.body.username, req.body.password], (err, result) => {
        if (err) {
            console.log(err)
            res.status(404).send('Database Error !!')
        }
        else {
            res.type('application/json')
            res.send(result[0])
        }
    })
})

// signup
router.post('/signup', (req, res) => {
    db.connection.query(`INSERT INTO Users (username, email, password) VALUES (?, ?, ?)`, [req.body.username, req.body.email, req.body.password], (err, result) => {
        if (err) {
            console.log(err)
            res.status(404).send('Database Error !!')
        }
        else {
            res.type('application/json')
            db.connection.query(`SELECT id, username FROM Users WHERE id=?`, [result.insertId], (err, r) => {
                res.send(r[0])
            })
        }
    })
})

module.exports = router