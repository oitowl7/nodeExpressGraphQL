# Express and Graphql Exercise Instructions
## Jordan Shear

![alt text](https://imgur.com/6DPwCn3.png "Express")
![alt text](https://imgur.com/FJnN209.png "React")
![alt text](https://imgur.com/JNYh20C.png "SQL")


This is a simple full stack app using Node and Express with graphQL on the back end and a simple React front end. It is designed to have 3 tables: `users`, `posts`, and `comments` and take the data from those tables and display them accordingly.

# To Initialize

First, navigate to the folder you want your project in. It is designed to run on the localhost. Once there type `git clone git@github.com:oitowl7/nodeExpressGraphQL.git` and `cd` into that directory.

This app is designed to use MYSQL with the **root** user, a password of **password**, at **localhost:3306**, with a database name of `graphQLExercise`. 

![alt text](https://imgur.com/cv3vjs1.png "Conn")

Should you need to change any of these, you must do so in the `db.js` file in the root of this directory. At the top of that file is the `Conn` variable and you can change those as you see fit.

Once you have ensured that your `Conn` is set up correctly, you must go to your MYSQL Workbench or equivalent software package and create the database, which in the default case is `graphQLExercise`. This was an oversight that I will fix with any future updates.

![alt text](https://imgur.com/MHVM6hO.png "SQL Workbench")

After you've sorted your database, you should install your dependancies. To do this, navigate to the root folder of this directory in your terminal and run `yarn run installDeps`. This will install the dependancies on both the server and client sides. 

Once this is complete, you can run `yarn run dev` which will initialize both the server and the front end at which point, the browser should load the page. It is set to run on `localhost:3000` while the proxy runs on `localhost:5000:`.

Whenever the server is spun up, the tables will be seeded or re-seeded automatically. There will always be 10 users, 10 posts, and 10 comments. These fields were populated using Sequelize and the names, emails, etc. in the actual data were created using Faker. 

# The App

The app has a very simple ui. The ui was designed using the `Semantic UI` package. It has a lot of simple components that I've used on past projects. There are only 2 buttons.

![alt text](https://imgur.com/Jexq1N3.png "Nothing")

Button 1 is to retrieve all users and display them on the screen on screen if the users have not been retrieved yet. This is done by using axios to send a query to the back end and have that query return all the users. If the users have already been retrieved, the button instead moves the data from the display object in state to a storage object and erases the display object, or vise versa depending on the current state. This was done to prevent multiple calls to the API to retrieve the same information.

![alt text](https://imgur.com/IpOUba0.png "Users")

Button 2 is to retrieve all posts and comments and display them on screen if they have not been retrieved yet. It is essentially the same process except that 2 calls are being made to the API, one for the posts and one for the comments. *This is not the most efficient way to do this in a real life scenario.* Retrieving all comments instead of only comments for certain posts is not the best way to do this however, I could not find out how to query based off of values in the objects nested within the data so ultimately, I decided to return all the comments and then sort them in the front end. This is a point for future improvement.

![alt text](https://imgur.com/MoDTGsy.png "Posts")


# Conclusion

I think that graphQL is a very good tool. It doesn't seem to have a ton of use yet so some problems that were faced just had to be brute force fixed. At one point, there was a set of curly braces that needed to be added to the query but the error message didn't provide a lot of information and the documentation didn't have that set of curly braces in it. This issue took up a few hours of time as I searched the db.js, schema.js, and server.js for a potential error until I accidentally added the curly braces on the client side and magically got the data back. 

There are a few inefficiencies in this project that, if it were to go to production, would have to be worked out. With the small data sets that I'm working with, there isn't really any slow-downs or problems but having the client sort through all the comments to match them to the posts is something that is far slower than having the database just return the data requested. 


![alt text](https://imgur.com/CrJFlWy.jpg "Users")
