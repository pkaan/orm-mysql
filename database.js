/*Update your password below
const { password } = require('./module.js')
let pass = password.password;
*/
let pass = "yourpassword";

//Install mysql database driver npm install mysql2
const Sequelize = require("sequelize");

// CONFIGURE CONNECTION TO THE DATABASE
// @ts-ignore
const connection = new Sequelize("bookings_db", "root", `${pass}`, {
  host: "localhost",
  dialect: "mysql",
});

connection
  .authenticate() // or sync(). -Authenticate is used to check whether you can connect to the database without executing a real query
  .then(() => {
    console.log("Connection to database established succesfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

/* Define MODEL User
 timestamps = true by default
 autoincremented Integer id by default
*/
const User = connection.define(
  "User",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    destination: Sequelize.STRING,
  },
  {
    timestamps: true, //CreatedAt, ModifiedAt
  }
);

//.sync({ force: true }) recreates the table for the Model User every time

/*
Using UUID as a primaryKey
        user_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        }
*/

// INSERT INTO users (name, destination) VALUES (....)
let insertValues = function (data) {
  console.log("QUERY: INSERT INTO ..");
  connection
    .sync()
    .then(() => User.bulkCreate(data))
    .catch((err) => {
      console.error("Error inserting values into table:", err);
    });
};

// FIND ALL, SELECT * FROM ..
let findall = function () {
  connection
    .sync()
    .then(() => User.findAll())
    .then((user) => {
      console.log("\nQUERY: SELECT * FROM ..");
      console.log(JSON.stringify(user));
    })
    .catch((err) => {
      console.error("Error getting values from the table:", err);
    });
};

// FIND BY CONDITION, SELECT * FROM .. WHERE
let findByCondition = function (value) {
  connection
    .sync()
    .then(() =>
      User.findAll({
        where: {
          destination: `${value}`,
        },
      })
    )
    .then((user) => {
      console.log("\nQUERY: SELECT * FROM .. WHERE ");
      console.log(JSON.stringify(user));
    })
    .catch((err) => {
      console.error("Error getting values from the table:", err);
    });
};

// FIND BY PRIMARY KEY
let findByPrimaryKey = function (id) {
  connection
    .sync()
    .then(() => User.findByPk(id)) // Can also use findOne()
    .then((user) => {
      console.log("\nQUERY: FIND BY PRIMARY KEY");
      console.log(JSON.stringify(user.name));
    })
    .catch((err) => {
      console.error("Error getting values from the table:", err);
    });
};

const data = [
  {
    name: "User1",
    destination: "Las Palmas",
  },
  {
    name: "User2",
    destination: "Birmingham",
  },
  {
    name: "User3",
    destination: "New York",
  },
  {
    name: "User4",
    destination: "Paris",
  },
];

// insert data
insertValues(data);

// get all data
findall();

// get data that fulfills a condition destination = new york
findByCondition("new york");

// get a single entry that has primary key value '1'
findByPrimaryKey(1);
