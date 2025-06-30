// const mysql = require("mysql2/promise");

// const connection = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0,
// });

const mongoose = require("mongoose");

const connection = async () => {
  const options = {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
  };

  await mongoose.connect(process.env.DB_HOST, options);

  if (mongoose.connection.readyState == 1) {
    console.log("connected");
  }
};

module.exports = connection;
