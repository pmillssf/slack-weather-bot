require('dotenv').config();
const express = require('express');
const { authSlackButton, authRedirect } = require('./slackAuth_handlers');
const receiveSlackEvents = require('./slackChannelEvents_handler');

process.env.PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('slack-weather-bot');
});

app.get('/api/v0.1/auth', authSlackButton);

app.get('/api/v0.1/auth/redirect', authRedirect);

app.post('/api/v0.1/slackchannelevents', receiveSlackEvents);

app.listen(process.env.PORT, () => {
  console.log(`listening on Port:${process.env.PORT}`);
});
