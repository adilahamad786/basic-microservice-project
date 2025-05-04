const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    console.log('Comming Event:', event.type);

    events.push(event);

    try {
        axios.post('http://localhost:5001/events', event).catch(error => console.log(error.message)); // Posts service
        axios.post('http://localhost:5002/events', event).catch(error => console.log(error.message)); // Comments service
        axios.post('http://localhost:5003/events', event).catch(error => console.log(error.message)); // Query service
        axios.post('http://localhost:5004/events', event).catch(error => console.log(error.message)); // Moderation service
        res.send({ status: 'OK' });
    } catch (error) {
        console.error("Error sending event:", error.message);
        res.status(500).send({ error: 'Failed to send event' });
    }
});

app.get('/events', (req, res) => {
    try {
        res.send(events);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Event bus listening on port ${PORT}`);
});