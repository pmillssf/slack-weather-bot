require('dotenv').config();
const express = require('express');
const { authSlackButton, authRedirect } = require('./slackAuth_handlers');
const receiveSlackEvents = require('./slackChannelEvents_handler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('slack-weather-bot');
});

app.get('/auth', authSlackButton);

app.get('/auth/redirect', authRedirect);

app.post('/', receiveSlackEvents);

app.listen('8080', () => {
  console.log('listening on 8080');
});
