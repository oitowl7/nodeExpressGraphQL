const mysql = require("mysql");


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //use your own root password. This project is not designed to be deployed. It is only to be used with the localhost and root user. 
    password: "password",
    //database being used
    database: 'graphQLPractice'
});

connection.connect(err => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  // console.log('connected as id ' + connection.threadId);
});

module.exports = connection;