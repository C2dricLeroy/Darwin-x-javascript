const UserService = require('../services/UserService');

class UserController {
    constructor(db) {
        this.db = db;
        this.userservice = new UserService(db);
    }

    async createUser(req, res) {
        const body = req.body;

        //TODO: Iterate over the array of users

        try {
            const response = await this.userservice.createUser(body);
            res.send(response);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = UserController;