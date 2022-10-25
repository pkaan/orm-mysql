/*Update your password below
const { password } = require('./module.js')
let pass = password.password;
*/

let pass = "yourpassword"
const Sequelize = require('sequelize');
const { timeStamp } = require('console');

// CONNECTING TO THE DATABASE
const connection = new Sequelize('bookings_db', 'root', `${pass}`, {
    host: 'localhost', 
    dialect: 'mysql'
});

connection
    .authenticate()
    .then(() => {console.log('Connection to database established succesfully.');

})
.catch(err => {
    console.error('Unable to connect to the database:', err);
})
 
/*
// DEFINE A MODEL = DEFINE A TABLE
USING UUID
const User = 
    connection.define('User', {
        user_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: Sequelize.STRING,
        destination: Sequelize.STRING
})
*/

// DEFINE A MODEL = DEFINE A TABLE
const User = 
    connection.define('User', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
            name: Sequelize.STRING,
            destination: Sequelize.STRING,
            //timestamps: false
})

// INSERT INTO users (name, destination) VALUES (....)
console.log("QUERY 1: INSERT INTO ..");
connection.sync()
.then(() => User.bulkCreate([{
    name: "Jason",
    destination: "Las Palmas"},
    {
    name: "Peetu",
    destination: "Birmingham"},
    {
    name: "Maliha",
    destination: "New York"},
    {
    name: "Amita",
    destination: "Paris"}
    ])
).catch(err => {
    console.error('Error inserting values into table:', err);
});


// FIND ALL, SELECT * FROM ..
connection.sync().then(() => User.findAll()).
then(user => {
    console.log("\nQUERY 2: SELECT * FROM ..");
    console.log(JSON.stringify(user));
}).catch(err => {
    console.error('Error getting values from the table:', err);
})

// FIND BY CONDITION, SELECT * FROM .. WHERE
connection.sync().then(() => User.findAll({
    where: {
        destination: 'New York'
    }
})).
then(user => {
    console.log("\nQUERY 3: SELECT * FROM .. WHERE ");
    console.log(JSON.stringify(user));
}).catch(err => {
    console.error('Error getting values from the table:', err);
})