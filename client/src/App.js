import React from "react";
import { BrowserRouter as Router, Route, Switch, /*Redirect*/ } from "react-router-dom";
import axios from "axios";
require('isomorphic-fetch');

class App extends React.Component {

  state = {
    
  };

  componentDidMount() {


    axios.get('/test').then(data => console.log(data)).catch(err=> console.log(err));
  
  }


  getUsers = () => {
    axios.post('/graphql', {
      query: `{user {
        id
        name
        email
      }}`
    }).then(data => {
      console.log(data);
      this.setState({users: data.data.data.user})
    }).catch(err => console.log(err));
  }

  getPosts = () => {
    axios.post('/graphql', {
      query: `{post {
        title
        userId{
          name
        }
      }}`
    }).then(data => {
      console.log(data);
      this.setState({posts: data.data.data.post})
    }).catch(err => console.log(err));
  }
  getComments = () => {
    axios.post('/graphql', {
      query: `
        {
          coment {
            coment
            userId {
              name
            }
            postId {
              title
            }
          }
        }
      `
    }).then(data => {
      console.log(data);
      this.setState({comments: data.data.data.coment})
    }).catch(err => console.log(err));
  }

  render() {
    
    return(
     <div>
       <button onClick={this.getUsers}>show users</button>
       <div className="users">
      {this.state.users ?
        this.state.users.map((user, i) => {
          return(
          <div key={i}>
            <span>Name: {user.name}   </span>
            <span>Emai: {user.email}</span>
          </div>
          )
        })
      : ""}
        
       </div>
       <button onClick={this.getPosts}>show posts</button>
       <div className="posts">
      {this.state.posts ?
        this.state.posts.map((post, i) => {
          return(
          <div key={i}>
            <span>Title: {post.title}   </span>
            <span>User: {post.userId.name}</span>
          </div>
          )
        })
      : ""}
        
       </div>
       <button onClick={this.getComments}>show comments</button>
       <div className="comments">
      {this.state.comments ?
        this.state.comments.map((comment, i) => {
          return(
          <div key={i}>
            <span>Comment: {comment.coment} </span>
            <span>Post: {comment.postId.title} </span>
            <span>User: {comment.userId.name}</span>
          </div>
          )
        })
      : ""}
        
       </div>
     </div>
    )
  }
}

export default App;
