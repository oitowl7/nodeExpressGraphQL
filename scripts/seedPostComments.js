const connection = require("../config/connection.js");

const postCommentsSeed = [
  [2, 1, '"I am glad that I do not have the same first and last name, I just wish it was a little more interesting"'],
  [3, 1, '"It could be worse. You could be named after a small armored rodent"'],
  [2, 2, '"I agree I would hate having the same first and last name. Almost as much as being named after a small armored rodent"'],
  [3, 2, '"At least your name is not as boring as Steve John. It is like I have two first names."'],
  [1, 3, '"I feel like your name has to be made up. Why would anyone be named after a New World rodent? The logic of your name really makes no sense"'],
  [3, 3, '"I am horribly depressed. If only my name was not so bad"'],
  [1, 4, '"Damn dude that blows"'],
  [2, 4, '"That is probably the worst name I have ever heard"']
];


const commentSeed = () => {
  let queryString = "INSERT INTO comments(user_id, post_id, comment) VALUES ";
  let number = 0;
  postCommentsSeed.forEach(seed => {
    if(number === 0) {
      queryString += `(${seed[0]}, ${seed[1]}, ${seed[2]})`
    } else {
      queryString += ` ,(${seed[0]}, ${seed[1]}, ${seed[2]}) `
    }
    number += 1;
  });
  queryString += ";";
  
  connection.query(queryString, (err, result) => {
    if(err) {
      throw err;
    }
    else {
      console.log("Comments Seeded");
    }
  })
}

module.exports = commentSeed;