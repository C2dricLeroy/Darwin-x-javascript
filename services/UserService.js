class UserService {
    constructor() {
    }

    async createUser(body, db) {
        try {
            return db.run('INSERT INTO user')
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserService;