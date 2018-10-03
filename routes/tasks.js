const express = require('express')
const router = express.Router()
const db = require('../db')
const url = require('url')

router.get('/', (req, res) => {
    var q = url.parse(req.url, true).query
    db.connection.query(`SELECT * FROM Tasks WHERE user_id=?`, [q.user], (err, result) => {
        if (err) {
            console.log(err)
            res.status(404).send('Database Error !!')
        }
        else {
            res.type('application/json')
            res.send(result)
        }
    })
})

router.post('/', (req, res) => {
    var q = url.parse(req.url, true).query
    db.connection.query("INSERT INTO Tasks (content, user_id) VALUES (?, ?)", [req.body.content, q.user], (err, r) => {
        if (err) {
            console.log(err)
            res.status(404).send('Database Error !!')
        }
        else {
            res.type('application/json')
            db.connection.query("SELECT * FROM Tasks WHERE id=?", [r.insertId], (err, result) => {
                res.send(result[0])
            })
        }
    })
})

router.get('/:id', (req, res) => {
    db.connection.query("SELECT * FROM Tasks WHERE id=?", [req.params.id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(404).send("Database Error !!")
        }
        else {
            res.type('application/json')
            res.send(result[0])
        }
    })
})

router.put('/:id', (req, res) => {
    db.connection.query("UPDATE Tasks SET content=? WHERE id=?", [req.body.content, req.params.id], (err, r) => {
        if (err) {
            console.log(err)
            res.status(404).send("Database Error !!")
        }
        else {
            res.type('application/json')
            db.connection.query("SELECT * FROM Tasks WHERE id=?", [req.params.id], (err, result) => {
                res.send(result[0])
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    db.connection.query("SELECT * FROM Tasks WHERE id=?", [req.params.id], (err, r) => {
        if (err) {
            res.status(404).send('Database Error !!')
        }
        else {
            db.connection.query("DELETE FROM Tasks WHERE id=?", [req.params.id], (err, result) => {
                if (err) {
                    res.status(404).send("Database Error !!")
                }
                else {
                    res.type('application/json')
                    res.send(r[0])
                }
            })
        }
    })
})

module.exports = router