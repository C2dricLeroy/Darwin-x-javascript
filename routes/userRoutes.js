const UserController = require('../controller/UserController');
const express = require('express');
const sqlite3 = require('sqlite3');

const router = express.Router();

const userController = new UserController();

router.post('/', async (req, res) => {
    await userController.createUser(req, res);
})

module.exports = router;