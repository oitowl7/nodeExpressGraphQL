import React from "react";
import { Form, Container, Button, Segment, Header, Grid} from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch, /*Redirect*/ } from "react-router-dom";
import axios from "axios";
require('isomorphic-fetch');
class App extends React.Component {

  state = {
    users: null,
    posts: null,
    comments: null,
    postButtonText: "show",
    userButtonText: "show"
  };

  componentDidMount() {
    //test call to the back end to make sure that the front and back ends are talking
    // axios.get('/test').then(data => console.log(data)).catch(err=> console.log(err));
  
  }


  getUsers = () => {
    //if this.state.users already exists, it means the user wants to hide the information so the data is moved to this.state.savedUsers to make it so that if the user wants to show the users again, there isn't another call to the api. The data is simply moved back to this.state.users. 
    if(this.state.users){
      this.setState({savedUsers: this.state.users, users: null, userButtonText: "show"});
      return;
    }
    if(this.state.savedUsers){
      this.setState({users: this.state.savedUsers, savedUsers: null, userButtonText: "hide"})
      return;
    }

    //if the data doesn't exist in either this.state.users or this.state.saved users, make the call to the api.
    axios.post('/graphql', {
      query: `{user {
        id
        name
        email
      }}`
    }).then(data => {
      this.setState({users: data.data.data.user, userButtonText: "hide"})
    }).catch(err => console.log(err));
  }

  getPosts = () => {
    //if this.state.posts already exists, it means the user wants to hide the information so the data is moved to this.state.savedPosts to make it so that if the user wants to show the posts again, there isn't another call to the api. The data is simply moved back to this.state.posts. Comments being moved aren't needed because they aren't displayed if the posts aren't displayed
    if(this.state.posts){
      this.setState({savedPosts: this.state.posts, posts: null, postButtonText: "show"});
      return;
    }
    if(this.state.savedPosts){
      this.setState({posts: this.state.savedPosts, savedPosts: null, postButtonText: "hide"});
      return;
    }

    // if data doesn't exist, make api call
    this.getComments();
    axios.post('/graphql', {
      query: `{post {
        title
        userId{
          name
        }
      }}`
    }).then(data => {
      this.setState({posts: data.data.data.post, postButtonText: "hide"});
    }).catch(err => console.log(err));
  }

  getComments = () => {
    //this is an inefficient way of handling this in a real life situation. Ideally, getting only the comments that correspond to a specific user or post id is the way to handle populating the comments. In real life, loading all the comments into the front end and then sorting from there is not the ideal way to do things. However, I couldn't work out the query to get just comments that corresponded to the post id so in order to make it work I had to just grab all of them and then sort them in react. This is a first point of update for any future changes.
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
      this.setState({comments: data.data.data.coment})
    }).catch(err => console.log(err));
  }

  render() {
  
    return(
     <div style={{backgroundColor: "#0064B5", height: "100vh"}}>
      <div style={{backgroundColor: "#0064B5", height: "100&"}}>
        <Container textAlign="center">
        <Header as="h1" style={{color: "#F26202", padding: 30}}>Jordan's GraphQL Exercise</Header>
        </Container>

        <Button color='orange' style={{margin: 20}} onClick={this.getUsers}>{this.state.userButtonText} users</Button>
        <div className="users">
        {/* if users exists, display them */}
        {this.state.users ?
          <Container textAlign="center">
            <Grid divided stackable columns={2}>
            {this.state.users.map((user, i) => {
              return(
                <Grid.Column width={8}  key={i}>
                  <Segment.Group>
                    <Segment raised style={{backgroundColor: "#16AB39", color: "white"}}>
                      <Header as="h3">Name: {user.name}</Header>
                    </Segment>
                    <Segment raised style={{backgroundColor: "#16AB39", color: "white"}}>
                      <Header as="h3">Email: {user.email}</Header>
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              )
            })}
            </Grid>
          </Container>
        : ""}
          
        </div>
        <Button color='orange' style={{margin: 20}} onClick={this.getPosts}>{this.state.postButtonText} posts</Button>
        <div className="posts">
        {/* if posts and comments exist, display them */}
        {this.state.posts && this.state.comments ?
          <Container textAlign="center">
            <Grid divided stackable columns={2}>
              {this.state.posts.map((post, i) => {
                return(
                  <Grid.Column width={8} key={i}>
                    <Segment.Group>
                      <Segment raised style={{backgroundColor: "#16AB39", color: "white"}}>
                        <Header as="h2">Title: {post.title}</Header>
                        <Header as="h4">By: {post.userId.name}</Header>
                      </Segment >
                      <Segment style={{backgroundColor: "#F26202", color: "white"}}>
                        <Header as="h3">Comments:</Header>
                        {/* if comment with a postid matching the current post being written, display it */}
                        {this.state.comments.map((comment, i) => {
                          if(comment.postId.title === post.title) {
                            return(
                              <div key={i}>
                                <Header as="h4">{comment.coment}</Header>
                                <Header as="h5" style={{fontStyle: "italic", marginLeft: 10,marginTop: -15}}>{comment.userId.name}</Header>
                              </div>
                            )
                          }
                        })}
                      </Segment>
                    </Segment.Group>
                  </Grid.Column>
                )
              })}
            </Grid>
          </Container>
        : ""}
          
        </div>
       </div>
     </div>
    )
  }
}

export default App;