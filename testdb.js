const pg = require('pg')
const mysql = require('mysql');

// MYSQL

function test_mysql() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'information_schema'
    });

    console.log('connecting Mysql')
    connection.connect((err) => {
        if (err) {
            console.error('Mysql error', err);
        } else {
            console.log('Mysql connected')

            connection.end();
        }
    });
}


// POSTGRESQL
function test_postgres() {
    const connection = new Client({
        host: 'figazio',
        port: 5334,
        user: 'postgres',
        password: '123456',
    })

    console.log('connecting Postgresql')
    connection.connect((err) => {
        if (err) {
            console.error('Postgresql error', err);
        } else {
            console.log('Postgresql connected')

            connection.end();
        }
    });
}

function test_postgres2() {
    console.log('pg 1');
    const pool = new pg.Pool({
        user: 'sysadmin',
        host: '127.0.0.1',
        database: 'mywebstore',
        password: '123',
        port: '5432'
    });

    pool.query('SELECT NOW()', (err, res) => {
        console.log(err, res);
        pool.end();
    });
}

test_postgres2();

// SET PASSWORD FOR root = '123456';
// UPDATE mysql.user SET authentication_string = PASSWORD("123456") WHERE User = 'root';
// CREATE USER 'user'
// @ 'localhost'
// IDENTIFIED BY '123456';
