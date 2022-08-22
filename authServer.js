require("dotenv").config()
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

//Lets our application use json from the body of the request.
app.use(express.json());

app.post("/login", (req, res) => {
    //Authenticate the user.

    const username = req.body.username;
    const user = { name: username }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
}

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})