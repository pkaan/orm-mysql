/*
Update your password below
const { password } = require('./module.js')
let pass = password.password;
*/ 
let pass = "yourpassword"
const Sequelize = require('sequelize');

// CONNECTING TO THE DATABASE
const connection = new Sequelize('bookings_db', 'root', `${pass}`, {
    host: 'localhost', 
    dialect: 'mysql'
});

connection.authenticate().then(() => {
    console.log('Connection to database established succesfully.');

})
.catch(err => {
    console.error('Unable to connect to the database:', err);
})
 
// MODEL
const User = 
    connection.define('User', {
        name: Sequelize.STRING,
        bio: Sequelize.STRING
    })

connection.sync();

// MODEL INTO TABLES 
connection.sync({
    logging: console.log
});