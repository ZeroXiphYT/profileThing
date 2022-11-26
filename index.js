//TODO: Add create user function and other stuff (to be decided)

const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL,
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/viewOrderCount', jsonParser, (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;

    console.log(req.body);

    var sentence = `SELECT ordercount FROM people WHERE firstname = '${firstName}' AND lastname = '${lastName}';`;

    pool.query(sentence, (err, result) => {
        console.table(result.rows);
        res.send({
            ordercount: result.rows[0].ordercount,
            firstName,
            lastName
        });
    });

});

app.post('/createPerson', jsonParser, (req, res) => {
    const firstName = req.fName;
    const lastName = req.lName;

});

app.listen(3000, console.log("listening on 3000"));