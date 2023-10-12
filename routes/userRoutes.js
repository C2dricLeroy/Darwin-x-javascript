const UserController = require('../controller/UserController');
const express = require('express');
const sqlite3 = require('sqlite3');

const router = express.Router();

const db = new sqlite3.Database('./iwanttoworkatdarwinx.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        return;
    } else if (err) {
        console.log("Getting error " + err);
        exit(1);
    }
})

const userController = new UserController(db);

router.post('/', async (req, res) => {
    await userController.createUser(req, res, db);
})

module.exports = router;