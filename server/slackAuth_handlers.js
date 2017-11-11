const axios = require('axios');
const { resolve } = require('path');

// auth request handlers from: https://api.slack.com/tutorials/app-creation-and-oauth

const authSlackButton = (req, res) => {
  res.sendFile(resolve('../client/add_to_slack.html'));
};

const authRedirect = (req, res) => {
  axios.get(`https://slack.com/api/oauth.access?\
    code=${req.query.code}\
    &client_id=${process.env.CLIENT_ID}\
    &client_secret=${process.env.CLIENT_SECRET}\
    &redirect_uri=${process.env.REDIRECT_URI}`)
    .then((response) => {
      console.log('response', response);
      res.send('success');
    })
    .catch(error => console.log('error', error));
};

module.exports = {
  authSlackButton,
  authRedirect,
};
