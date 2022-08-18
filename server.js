const express = require("express");
const app = express();

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

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})