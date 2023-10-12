const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
var db;

function createTables(newdb) {
    newdb.exec(`
    create table use (
        id int primary key not null,
        last_name text not null,
        first_name text not null,
        ip_addr text not null,
        city text not null
    );
        `, ()  => {
        runQueries(newdb);

        //
        const arrUsers = require('./data/mock.json')
        for (let user of arrUsers) {

            runQueries(`
                insert into user (first_name, last_name, city)
                values ('${user['first_name']}', '${user['last_name']}', '${user['city']}');
               `)
        }

    });
}

function createDatabase() {
    db = new sqlite3.Database('iwanttoworkatdarwinx.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
        createTables(newdb);
    });
}

new sqlite3.Database('./iwanttoworkatdarwinx.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        return;
    } else if (err) {
        console.log("Getting error " + err);
        exit(1);
    }
});


app.get('/', function (req, res) {
    res.send('DarwinX - Job Tech Test');
})

const server = app.listen(8081, function () {

    const host = server.address().address
    const port = server.address().port

    console.log("DarwinX is listening to you - http://%s:%s", host, port)
})