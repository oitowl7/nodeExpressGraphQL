const connection = require("../config/connection.js");


const postSeedValues = [
  [1, '"The value of having almost the same first name and last name"'],
  [1, '"Why I decided I do not like having almost the same first and last name"'],
  [2, '"Why having a last name the same as a armored rodent sucks"'],
  [3, '"My name is boring"']
];

const postSeed = () => {
  let queryString = "INSERT INTO posts(user_id, title) VALUES ";
  let number = 0;
  postSeedValues.forEach(seed => {
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
      console.log("Posts Seeded");
    }
  })
}

module.exports = postSeed;