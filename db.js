const Sequelize =  require('sequelize');
const _ = require('lodash');
const Faker = require('faker');

const database = "graphQLExercise"

const Conn = new Sequelize(
  //database name
  database,
  //user
  "root",
  //password
  "password",
  {
    //sql type being used
    dialect: "mysql",
    //hostname
    host: "localhost"
  }
);

const User = Conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Post = Conn.define('post', {
  title:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Coment = Conn.define('coment', {
  coment: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// relationshipts
User.hasMany(Post);
Post.hasMany(Coment);
Post.belongsTo(User);
Coment.belongsTo(Post);
Coment.belongsTo(User);

//this will run each time the back end server reinitializes and will seed the coments, post, and user tables. 
Conn.sync({force: true}).then(()=>{
  _.times(10, () => {
    return User.create({
      name: Faker.name.findName(),
      email: Faker.internet.email()
    }).then(user => {
      return user.createPost({
        title: Faker.lorem.words()
      })
    }).then(post => {
      return post.createComent({
        coment: Faker.lorem.words(),
        userId: Faker.random.number({min: 1, max: 10}),
        postId: Faker.random.number({min: 1, max: 10})
      })
    })
  })
})


module.exports = Conn;