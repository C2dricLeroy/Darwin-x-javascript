const express = require('express');
const sqlite3 = require('sqlite3');

const userRoutes = require('./routes/userRoutes');

const app = express();
var db;

function createDatabase() {
    db = new sqlite3.Database('iwanttoworkatdarwinx.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            process.exit(1);
        }
        createTables(db);
    });
}

function createTables(db) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY NOT NULL,
        last_name TEXT NOT NULL,
        first_name TEXT NOT NULL,
        ip_addr TEXT NOT NULL,
        city TEXT NOT NULL
    );
        `, ()  => {
        runQueries(db);

        //
        const arrUsers = require('./data/mock.json')
        for (let user of arrUsers) {
            db.run(`
                INSERT INTO user (first_name, last_name, city)
                VALUES ('${user['id']}', '${user['first_name']}', '${user['last_name']}', '${user['ip_address']}', '${user['city']}');
               `);
        }
    });
}
new sqlite3.Database('./iwanttoworkatdarwinx.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code === "SQLITE_CANTOPEN") {
        createDatabase();
        return;
    } else if (err) {
        console.log("Getting error " + err);
        process.exit(1);
    }
});





app.get('/', function (req, res) {
    res.send('DarwinX - Job Tech Test');
});

app.use('/users', userRoutes);

const server = app.listen(8081, function () {

    const host = server.address().address
    const port = server.address().port

    console.log("DarwinX is listening to you - http://%s:%s", host, port)
})