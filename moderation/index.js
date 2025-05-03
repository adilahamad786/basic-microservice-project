const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5004;

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('Received event:', type);

    if (type === 'CommentCreated') {
        const { content } = data;
        const status = content.includes('hell') ? 'rejected' : 'approved';

        await axios.post('http://localhost:5000/events', {
            type: 'CommentModerated',
            data: { ...data, status }
        });
    }

    res.send({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Moderation service listening on port ${PORT}`);
});