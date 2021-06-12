//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to my blog code, I'm now going to give you instructions on how to use it, first of it works by using routs, by that i mean: localhost:3000/compose. this link takes you to the publishing area of the web, this is where you can post various stories and share content. enter the read more section to fully see what users have posted. this code was an experience i had to go through in my journey with node.js + express";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let posts = [];


app.get("/", (req, res) => {
    res.render("home", {
        home: homeStartingContent,
        posts: posts
    }); // when using this the key = the output

});


app.get("/about", (req, res) => {
    res.render("about", { about: aboutContent });
});

app.get("/contact", (req, res) => {
    res.render("contact", { contact: contactContent });
});
app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const userPost = {
        title: req.body.postTitle,
        content: req.body.postBody,
    };
    posts.push(userPost);
    res.redirect("/")
});


// express routing parameter
app.get("/posts/:post", (req, res) => {
    const requestedTitle = _.lowerCase(req.params.post);
    posts.forEach(post => {
        const storedTitle = _.lowerCase(post.title);
        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content
            });
        }
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000...");
});