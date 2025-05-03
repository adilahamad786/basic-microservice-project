const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); 

const app = express();

const PORT = process.env.PORT || 5002;

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', async (req, res) => {
    try {
        res.send(posts);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/events', async (req, res) => {
    console.log('Received event:', req.body.type);
    const {type, data} = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    else if (type === 'CommentCreated') {
        const { id, content, postId } = data;
        posts[postId].comments.push({ id, content });
    }

    res.send({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Query service listening on port ${PORT}`);
});