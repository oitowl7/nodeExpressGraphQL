const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require("graphql");
const Db = require("./db.js");

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user',

  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(user) {
          return user.name
        }
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email
        }
      },
      posts: {
        type: new GraphQLList(Post),
        resolve(user) {
          return user.getPosts();
        }
      },
      coment: {
        type: new GraphQLList(Coment),
        resolve(user) {
          return user.getComents();
        }
      }
    }
  }
});

const Post = new GraphQLObjectType({
  name: 'Post',
  description: "This is a post",

  fields: () => {
    return {
      title: {
        type: GraphQLString,
        resolve(post) {
          return post.title;
        }
      },
      userId: {
        type: User,
        resolve(post) {
          return post.getUser();
        }
      },
      coment: {
        type: Coment,
        resolve(post) {
          return post.getComent();
        }
      }
    }
  }
});

const Coment = new GraphQLObjectType({
  name: 'Coment',
  description: "This is a Coment",

  fields: () => {
    return {
      coment: {
        type: GraphQLString,
        resolve(coment) {
          return coment.coment;
        }
      },
      postId: {
        type: Post,
        resolve(coment) {
          return coment.getPost();
        }
      },
      userId: {
        type: User,
        resolve(coment) {
          return coment.getUser();
        }
      }
    }
  }
});



// const Coment = new GraphQLObjectType({
//   name: "Coment",
//   description: "Coment made by user on a post",

//   fields: () => {
//     return {
//       coment: {
//         type: GraphQLString,
//         resolve(coment) {
//           coment.coment
//         }
//       },
//       userId: {
//         type: User,
//         resolve(coment) {
//           return coment.getUser();
//         }
//       },
//       postId: {
//         type: Post,
//         resolve(coment) {
//           return coment.getPost();
//         }
//       }
//     }
//   }
// })

const Query = new GraphQLObjectType({
  name: "Query",
  description: "This is root query",

  fields: () => {
    return {
      user: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.user.findAll({where: args});
        }
      },
      post: {
        type: new GraphQLList(Post),
        resolve(root, args) {
          return Db.models.post.findAll({where: args});
        }
      },
      coment: {
        type: new GraphQLList(Coment),
        resolve(root, args) {
          return Db.models.coment.findAll({where: args});
        }
      },
    }
  }
});

// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   description: "This is a mutation",

//   fields(){
//     return {
//       addUser: {
//         type: User,
//         args: {
//           firstName: {
//             type: new GraphQLNonNull(GraphQLString),
//           },
//           lastName: {
//             type: new GraphQLNonNull(GraphQLString),
//           },
//           email: {
//             type: new GraphQLNonNull(GraphQLString),
//           },
//         }, 
//         resolve( _ , args) {
//           return Db.models.user.create({
//             firstName: args.firstName,
//             lastName: args.lastName,
//             email: args.email.toLowerCase()
//           })
//         }
//       }
//     }
//   }
// })

const Schema = new GraphQLSchema({
  query: Query,
  // mutation: Mutation
});

module.exports = Schema;