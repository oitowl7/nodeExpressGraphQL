const seedPostComments = require('./seedPostComments.js');
const seedPosts = require('./seedPosts');
const seedUsers = require('./seedUsers');

//seeds all the tables that are being used with mock data
seedPostComments();
seedPosts();
seedUsers();