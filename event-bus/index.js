const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
    const event = req.body;
    console.log('Comming Event:', event.type);

    try {
        await axios.post('http://localhost:5000/events', event); // Posts service
        await axios.post('http://localhost:5001/events', event); // Comments service
        await axios.post('http://localhost:5002/events', event); // Query service

        res.send({ status: 'OK' });
    } catch (error) {
        console.error("Error sending event:", error.message);
        res.status(500).send({ error: 'Failed to send event' });
    }
});

app.listen(PORT, () => {
    console.log(`Event bus listening on port ${PORT}`);
});