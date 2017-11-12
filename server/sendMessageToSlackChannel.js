require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring');

const sendMessageToSlack = (channel, text) => {
  return axios.post('https://slack.com/api/chat.postMessage', querystring.stringify({
    token: process.env.BOT_TOKEN,
    channel,
    text,
  }));
};

module.exports = sendMessageToSlack;
