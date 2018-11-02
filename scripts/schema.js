const connection = require("../config/connection.js");


const schema = () => {
  const dropIfExists = `DROP TABLE IF EXISTS users, comments, posts;`
  const createUsers = `CREATE TABLE users (id INT NOT NULL auto_increment, email VARCHAR (225) NOT NULL, name VARCHAR (225) NOT NULL,PRIMARY KEY (id));`;
  const createPosts = `CREATE TABLE posts (id INT NOT NULL auto_increment, user_id INT NOT NULL, title VARCHAR (255) NOT NULL, PRIMARY KEY (ID)); `;
  const createComments = `CREATE TABLE comments (id INT NOT NULL auto_increment, user_id INT NOT NULL, post_id INT NOT NULL, comment VARCHAR (511) NOT NULL, PRIMARY KEY (ID));`;

  connection.query(dropIfExists, (err, result) => {
    if(err){
      throw err;
    } else {
      connection.query(createUsers, (err, result) => {
        if(err) {
          throw err;
        }
        else {
          console.log("Created Users");
        }
      });
      connection.query(createPosts, (err, result) => {
        if(err){
          throw err;
        } else {
          console.log("Created Posts");
        }
      });
      connection.query(createComments, (err, result) => {
        if (err){
          throw err;
        } else {
          console.log("Created Comments");
          process.exit(0);
        }
      });
    }
  });
}

module.exports = schema;