const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    try {
        res.send(posts);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post("/posts", (req, res) => {
    try {
        const postId = randomBytes(4).toString('hex');
        const content = req.body.content;

        if (!req.body && !content) {
            throw new Error("Please provide post content!");
        }

        posts[postId] = { id: postId, content};

        res.status(201).send(posts);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})