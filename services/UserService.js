class UserService {
    constructor(db) {
        this.db = db;
    }

    async createUser(body) {
        try {
            return this.db.run('INSERT INTO user')
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserService;