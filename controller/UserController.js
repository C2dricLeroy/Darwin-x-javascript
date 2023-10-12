const UserService = require('../services/UserService');

class UserController {
    constructor() {
        this.userservice = new UserService();
    }

    async createUser(req, res) {
        const db = req.db;
        const body = req.body;

        //TODO: Iterate over the array of users

        try {
            const response = await this.userservice.createUser(body, db);
            res.send(response);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = UserController;