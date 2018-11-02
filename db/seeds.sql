INSERT INTO users (email, name) 
	values 
    ("email@email.com", "Email O'McEmail"),
    ("email@armadillo.com", "Email Armadillo"),
    ("steve@email.com", "Steve John");

INSERT INTO posts (user_id, title)
	VALUES
    (1, "The value of having almost the same first name and last name"),
    (1, "Why I decided I don't like having almost the same first and last name"),
    (2, "Why having a last name the same as a armored rodent sucks"),
    (3, "My name is boring");
    
INSERT INTO comments (user_id, post_id, comment)
	VALUES
    (2, 1, "I am glad that I don't have the same first and last name, I just wish it was a little more interesting"),
    (3, 1, "It could be worse. You could be named after a small armored rodent"),
    (2, 2, "I agree I'd hate having the same first and last name. Almost as much as being named after a small armored rodent"),
    (3, 2, "At least your name is not as boring as Steve John. It's like I have two first names."),
    (1, 3, "I feel like your name has to be made up. Why would anyone be named after a New World rodent? The logic of your name really makes no sense"),
    (3, 3, "I am horribly depressed. If only my name wasn't so bad"),
    (1, 4, "Damn dude that blows"),
    (2, 4, "That's probably the worst name I have ever heard");