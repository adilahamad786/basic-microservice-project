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
    // const postId = req.params.id;
    try {
        // const postComments = posts[postId] || [];
        // res.send(postComments);
        res.send(posts);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/events', async (req, res) => {
    console.log('Received event:', req.body.type);

    if (req.body.type === 'PostCreated') {
        const { id, title } = req.body.data;
        posts[id] = { id, title };
    }
    else if (req.body.type === 'CommentCreated') {
        const { id, content, postId } = req.body.data;
        posts[postId].comments = posts[postId].comments || [];
        posts[postId].comments.push({ id, content });
    }

    res.send({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Query service listening on port ${PORT}`);
});