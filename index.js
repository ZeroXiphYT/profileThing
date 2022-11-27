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

app.post('/order', jsonParser, (req, res) => {
    const { spicyLev, food, sauce, topping1, topping2, topping3, firstName, lastName, userId } = req.body;
    console.table(req.body);
    var sentence = `SELECT ordercount FROM people WHERE firstname = '${firstName}' AND lastname = '${lastName}' AND personid = ${userId};`;

    pool.query(sentence, (err, result) => {
        if (result.rowCount === 0) {
            res.send({
                userFound: "User does not exist",
                success: false
            });
            return;
        }

        sentence = `
        SELECT orderid FROM orders
        ORDER BY orderid DESC
        LIMIT 1;
        `;

        pool.query(sentence, (err, result) => {
            console.table(result.rows);
            var lastOrderId = result.rows[0].orderid;
            var newOrderId = lastOrderId + 1;
            sentence = `
                INSERT INTO orders VALUES (${newOrderId}, '${lastName}', '${firstName}', ${userId}, '${food}', '${sauce}', '${topping1}', '${topping2}', '${topping3}', '${spicyLev}');
            `;

            pool.query(sentence, (error, result2) => {
                if (error) res.send(error);
                sentence = `
                SELECT ordercount FROM people
                WHERE firstname = '${firstName}' AND lastname = '${lastName}' AND personid = ${userId}
                ORDER BY ordercount DESC
                LIMIT 1;
                `;
                pool.query(sentence, (err, result) => {
                    console.table(result.rows);
                    var lastOrderCount = result.rows[0].ordercount;
                    var newOrderCount = lastOrderCount + 1;
                    console.log(lastOrderCount, newOrderCount);
                    sentence = `
                    UPDATE people
                    SET ordercount = ${newOrderCount}
                    WHERE firstname = '${firstName}' AND lastname = '${lastName}' AND personid = ${userId};
                    `;
                    pool.query(sentence, (err, result3) => {
                        return;
                    });
                });
                if (result2) res.send({
                    result: result2,
                    success: true
                });
            });
        });
    });
});

app.post('/seeOrdersOfUser', jsonParser, (req, res) => {
    const firstName = req.body.fName.toLowerCase();
    const lastName = req.body.lName.toLowerCase();
    const userId = req.body.userId;
    console.log(req.body);

    var sentence = `SELECT food, sauce, topping1, topping2, topping3, spicy FROM orders WHERE firstname = '${firstName}' AND lastname = '${lastName}' AND personid = '${userId}';`;

    pool.query(sentence, (err, result) => {
        if (result.rowCount === 0) {
            res.send({
                userFound: "User does not exist or no orders"
            });
            return;
        }
        console.table(result.rows);
        res.send({
            ordercount: result.rows[0].ordercount,
            orders: result.rows
        }
        );
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

app.get('/seeCreateOrderPage', (req, res) => {
    res.render('createOrderPage');
});

app.get('/seeUserOrderPage', (req, res) => {
    res.render('seeUserOrders');
});

app.listen(3000, console.log("listening on 3000"));