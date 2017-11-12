require('dotenv').config();
const { TempEventLog, parseSlackMessage } = require('./utils');
const sendMessageToSlack = require('./sendMessageToSlackChannel');
const { fetchWeather, formatWeather } = require('./weather');
const {
  botHelp, botMentioned, cityNotFoundError, weatherAPIError, querySyntaxError
} = require('./botDialogue');

const receivedEvents = new TempEventLog();

const receiveSlackEvents = (req, res) => {
  if (req.body.token !== process.env.VERIFICATION_TOKEN) {
    res.status(402);
    res.send('Not Authorized');
  } else if (req.body.challenge) {
    // Handle Slack Events API url_verification
    res.set({ 'Content-type': 'text/plain' });
    res.status(200);
    res.send(req.body.challenge);
  } else {
    res.status(202);
    res.send();
    const { event } = req.body;
    if (event.text && event.user !== process.env.BOT_USERNAME
    && event.text.includes(process.env.BOT_USERNAME)
    && receivedEvents.addEvent(req.body.event_id)) {
      sendMessageToSlack(event.channel, botMentioned)
        .then(() => {
          return parseSlackMessage(process.env.BOT_USERNAME, event.text);
        })
        .then((parsedText) => {
          if (parsedText === 'help') {
            return sendMessageToSlack(event.channel, botHelp);
          }
          if (parsedText === 'queryError') {
            return sendMessageToSlack(event.channel, querySyntaxError);
          }
          return fetchWeather(parsedText)
            .then((response) => {
              return formatWeather(response.data);
            })
            .then((formatedWeather) => {
              sendMessageToSlack(event.channel, formatedWeather);
            })
            .catch((error) => {
              console.log('error', error);
              if (error.response.data.cod === '404') {
                return sendMessageToSlack(event.channel, cityNotFoundError);
              }
              return sendMessageToSlack(event.channel, weatherAPIError);
            });
        })
        .catch(error => console.log('error', error));
    }
  }
};

module.exports = receiveSlackEvents;
