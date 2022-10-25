/*Update your password below
const { password } = require('./module.js')
let pass = password.password;
*/

let pass = "yourpassword"
const Sequelize = require('sequelize');


// CONNECT TO THE DATABASE
const connection = new Sequelize('bookings_db', 'root', `${pass}`, {
    host: 'localhost', 
    dialect: 'mysql'
});

connection
    .authenticate() // authenticate is used to check whether you can connect to the database without executing a real query
    .then(() => {console.log('Connection to database established succesfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
})
 
// CREATE TABLE users using MODEL User
const User = 
    connection.define('User', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        destination: Sequelize.STRING,
}, {
    timestamps: true
})

// INSERT INTO users (name, destination) VALUES (....)
let insertValues = function (data) {
    console.log("QUERY: INSERT INTO ..");
    connection.sync()
    .then(() => User.bulkCreate(data)
    ).catch(err => {
        console.error('Error inserting values into table:', err);
    });
}

/*
Using UUID as a primaryKey
        user_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        }
*/

// FIND ALL, SELECT * FROM ..
let findall = function () {
connection.sync().then(() => User.findAll())
.then(user => {
    console.log("\nQUERY: SELECT * FROM ..");
    console.log(JSON.stringify(user));
}).catch(err => {
    console.error('Error getting values from the table:', err);
})
}

// FIND BY CONDITION, SELECT * FROM .. WHERE
let findByCondition = function (value) {
connection.sync().then(() => User.findAll({
    where: {
        'destination' : `${value}`
    }
}))
.then(user => {
    console.log("\nQUERY: SELECT * FROM .. WHERE ");
    console.log(JSON.stringify(user));
}).catch(err => {
    console.error('Error getting values from the table:', err);
})
}

// FIND BY PRIMARY KEY 
let findByPrimaryKey = function (id) {
connection.sync().then(() => User.findByPk(id))
.then(user => {
    console.log("\nQUERY: FIND BY PRIMARY KEY");
    console.log(JSON.stringify(user.name));
}).catch(err => {
    console.error('Error getting values from the table:', err);
})
}

const data = [{
    'name': 'Jason',
    'destination': 'Las Palmas'},
    {
    'name' : 'Peetu',
    'destination' : "Birmingham"},
    {
    'name': 'Maliha',
    'destination' : 'New York'},
    {
    'name' : 'Amita',
    'destination' : 'Paris'}
]

insertValues(data);

findall();

findByCondition("new york");

findByPrimaryKey(1); // Should print 'Jason'
