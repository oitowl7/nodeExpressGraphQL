const express = require("express");
const router = express.Router();
var { graphql, buildSchema } = require('graphql');


router.get('/', (req, res) => {
  var schema = buildSchema(`
    type Query {
      hello: String
    }
  `);
  
  var root = { hello: () => 'Hello world!' };
  
  graphql(schema, '{ hello }', root).then((response) => {
    res.send(response);
  });
  // res.send("Howdy");
});

router.use("/posts", require("./posts.js"));
router.use("/users", require("./users.js"));
router.use("/post", require("./post.js"));

module.exports = router;



// var { graphql, buildSchema } = require('graphql');

// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// var root = { hello: () => 'Hello world!' };

// graphql(schema, '{ hello }', root).then((response) => {
//   console.log(response);
// });
