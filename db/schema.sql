CREATE DATABASE graphQLPractice;

USE graphQLPractice; 

CREATE TABLE users (
	id INT NOT NULL auto_increment,
    email VARCHAR (225) NOT NULL,
    name VARCHAR (225) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE posts (
	id INT NOT NULL auto_increment,
    user_id INT NOT NULL,
    title VARCHAR (255) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE comments (
	id INT NOT NULL auto_increment,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    comment VARCHAR (511) NOT NULL,
    PRIMARY KEY (ID)
);