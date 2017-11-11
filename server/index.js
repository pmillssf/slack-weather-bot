const express = require('express');
const { authSlackButton, authRedirect } = require('./slackAuth_handlers');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('slack-weather-bot');
});

app.get('/auth', authSlackButton);

app.get('/auth/redirect', authRedirect);

app.listen('3000', () => {
  console.log('listening on 3000');
});
