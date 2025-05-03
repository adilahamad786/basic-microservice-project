const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5001;

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

app.post("/posts", async (req, res) => {
    try {
        const postId = randomBytes(4).toString('hex');
        const title = req.body.title;

        if (!req.body && !title) {
            throw new Error("Please provide post content!");
        }

        posts[postId] = { id: postId, title};

        await axios.post('http://localhost:5000/events', {
            type: 'PostCreated',
            data: { id: postId, title }
        });

        res.status(201).send(posts);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/events', (req, res) => {
    try {
        console.log('Received event:', req.body.type);
        res.send({ status: 'OK' });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})