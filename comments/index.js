const express = require("express");
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    try {
        const postId = req.params.id;
        const postComments = commentsByPostId[postId] || [];
    
        res.send(postComments);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/posts/:id/comments', async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params.id;
        const commentId = randomBytes(4).toString('hex');
    
        const postComments = commentsByPostId[postId] || [];
        postComments.push({ id: commentId, content });
        commentsByPostId[postId] = postComments;
    
        await axios.post('http://localhost:5003/events', {
            type: 'CommentCreated',
            data: { id: commentId, content, postId }
        });

        res.status(201).send(postComments);
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
});