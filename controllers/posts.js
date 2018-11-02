const express = require('express');
const bodyParser = require("body-parser");
let router = express.Router();


router.get("/", (req, res) => {
  res.send("this is the posts page");
})


module.exports = router;