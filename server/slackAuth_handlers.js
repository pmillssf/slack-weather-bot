require('dotenv').config();
const axios = require('axios');
const path = require('path');

// auth request handlers from: https://api.slack.com/tutorials/app-creation-and-oauth

const authSlackButton = (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../client', 'add_to_slack.html'));
};

const authRedirect = (req, res) => {
  axios.get(`https://slack.com/api/oauth.access?code=${req.query.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${process.env.REDIRECT_URI}`)
    .then((response) => {
      console.log('response', response);
      res.status(200);
      res.send('success');
    })
    .catch(error => console.log('error', error));
};

module.exports = {
  authSlackButton,
  authRedirect,
};
