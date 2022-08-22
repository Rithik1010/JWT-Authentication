require("dotenv").config()
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

//Lets our application use json from the body of the request.
app.use(express.json());

const posts = [
    {
        username: "Rosh",
        Title: "Post 1"
    },
    {
        username: "Rathod",
        Title: "Post 2"
    }
]

app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});

app.post("/login", (req, res) => {
    //Authenticate the user.

    const username = req.body.username;
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
})

// Create a middleware to authenticate user
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    // Get the second parameter from the Bearer Token
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null)   res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})