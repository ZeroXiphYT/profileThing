//TODO: Add create user function and other stuff (to be decided)

const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
require('dotenv').config();

const app = express();
app.use(express.static(__dirname + '/public'));
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
    const firstName = req.body.fName.toLowerCase();
    const lastName = req.body.lName.toLowerCase();
    const userId = req.body.userId;
    console.log(req.body);

    var sentence = `SELECT ordercount FROM people WHERE firstname = '${firstName}' AND lastname = '${lastName}' AND personid = ${userId};`;

    pool.query(sentence, (err, result) => {
        if (result.rowCount === 0) {
            res.send({
                userFound: "User does not exist"
            });
            return;
        }
        console.table(result.rows);
        res.send({
            ordercount: result.rows[0].ordercount,
            firstName,
            lastName,
            userId,
        }
        );
    });

});

app.post('/createPerson', jsonParser, (req, res) => {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var orderNum = req.body.orderNum;

    var sentence = `
        SELECT personid FROM people
        ORDER BY personid DESC
        LIMIT 1;
    `;

    pool.query(sentence, (err, result) => {
        console.table(result.rows);
        var lastPersonid = result.rows[0].personid;
        var newPersonId = lastPersonid + 1;
        sentence = `
            INSERT INTO people VALUES (${newPersonId}, '${lastName}', '${firstName}', ${orderNum});
        `;
        pool.query(sentence, (error, resultJ) => {
            console.table(resultJ.rows);
            res.send({
                fName: firstName,
                lName: lastName,
                orderCount: orderNum,
                userId: newPersonId
            });
        });
    });
});

//pages

app.get('/seeOrdersPage', (req, res) => {
    res.render('seeOrder');
});

app.get('/seeMainPage', (req, res) => {
    res.render('index');
});

app.get('/seeCreateUserPage', (req, res) => {
    res.render('createUser');
});

app.listen(3000, console.log("listening on 3000"));