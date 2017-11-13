const sendMessageToSlack = require('../sendMessageToSlackChannel');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

describe('Testing SendMessageToSlack', () => {
  
  beforeEach(() => {
    mock.reset();
  });

  it('Should send a Post request to https://slack.com/api/chat.postMessage', () => {
    expect.assertions(1);

    mock.onPost('https://slack.com/api/chat.postMessage')
      .reply((config) => {
      return [201, 'success'];
      });

    const channel = 'mock-channel';
    const text = 'mock-text';

    expect(sendMessageToSlack(channel, text)).resolves.toHaveProperty('data', 'success');
  });
  
  it('Should have Content-Type: application/x-www-form-urlencoded in the header', () => {
    expect.assertions(1);

    mock.onPost('https://slack.com/api/chat.postMessage')
      .reply((config) => {
      return [201, config.headers['Content-Type']];
      });

    const channel = 'mock-channel';
    const text = 'mock-text';

    expect(sendMessageToSlack(channel, text)).resolves.toHaveProperty('data', 'application/x-www-form-urlencoded');
  });

  it('Should include a channel, token, and text in its Post request', () => {
    expect.assertions(3);
    
    process.env.BOT_TOKEN = 'bot-token';
    
    mock.onPost('https://slack.com/api/chat.postMessage')
      .reply((config) => {
        const data = config.data.split('&');
        const token = data[0].split('=')[1];
        const channel = data[1].split('=')[1];
        const text = data[2].split('=')[1];
        return [201, {token, channel, text}];
      });

    const channel = 'mock-channel';
    const text = 'mock-text';

    expect(sendMessageToSlack(channel, text)).resolves.toHaveProperty('data.token', 'bot-token');
    expect(sendMessageToSlack(channel, text)).resolves.toHaveProperty('data.channel', 'mock-channel');
    expect(sendMessageToSlack(channel, text)).resolves.toHaveProperty('data.text', 'mock-text');
  });

});