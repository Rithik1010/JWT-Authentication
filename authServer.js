require("dotenv").config()
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

//Lets our application use json from the body of the request.
app.use(express.json());

//Storing refresh tokens locally
let refreshTokens = [];

app.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null)                    return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken))   return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) res.sendStatus(403);
        const accessToken = generateAccessToken({ name : user.name });
        res.json({accessToken: accessToken});
    });
})

app.post("/login", (req, res) => {
    //Authenticate the user.

    const username = req.body.username;
    const user = { name: username }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
}

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})