const connection = require("../config/connection.js");


const userValues = [
  [`"email@email.com"`, `"Email O'McEmail"`],
  [`"email@armadillo.com"`, `"Email Armadillo"`],
  [`"steve@email.com"`, `"Steve John"`]
];

const postSeed = () => {
  let queryString = "INSERT INTO users(email, name) VALUES ";
  let number = 0;
  userValues.forEach(seed => {
    if(number === 0) {
      queryString += `(${seed[0]}, ${seed[1]})`
    } else {
      queryString += ` ,(${seed[0]}, ${seed[1]}) `
    }
    number += 1;
  });
  queryString += ";";
  

  connection.query(queryString, (err, result) => {
    if(err) {
      throw err;
    }
    else {
      console.log("Users Seeded");
      process.exit(0);
    }
  })
}

module.exports = postSeed;