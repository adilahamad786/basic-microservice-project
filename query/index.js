const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); 

const app = express();

const PORT = process.env.PORT || 5003;

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    else if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({ id, content, status });
    }
    else if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const postComments = posts[postId].comments;
        const comment = postComments.find(comment => comment.id === id);
        if (comment) {
            comment.status = status;
        }
    }
};

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

    handleEvents(type, data);

    res.send({ status: 'OK' });
});

app.listen(PORT, async () => {
    try {
        console.log(`Query service listening on port ${PORT}`);
    
        const response = await axios.get("http://localhost:5000/events");
        const events = response.data;
        
        for (let event of events) {
            const {type, data} = event;
            handleEvents(type, data);
        }
    } catch (error) {
        console.error('Error fetching events:', error.message);
    }
});