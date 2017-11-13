const httpMocks = require('node-mocks-http');
const receivesSlackEvents = require('../slackChannelEvents_handler');

describe('Testing slackChannelEvents_handler', () => {

  it('Responds to a POST request without a verified token with 402', () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/v0.1/slackchannelevents',
      body: {token: '', event: {}}, 
    });
    const response = httpMocks.createResponse();

    receivesSlackEvents(request, response);

    expect(response.statusCode).toBe(402);
    expect(response._getData()).toBe('Not Authorized');
  });

  it('Responds to a POST request with a verified token with 202', () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/v0.1/slackchannelevents',
      body: {token: 'I\'m Good!', event: {}}, 
    });
    const response = httpMocks.createResponse();
    process.env.VERIFICATION_TOKEN = 'I\'m Good!';

    receivesSlackEvents(request, response);

    expect(response.statusCode).toBe(202);

  });

  // Slack Events API url_verification
  it('Responds to a challenge with the challenge', () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/v0.1/slackchannelevents',
      body: {token: 'I\'m Good!', event: {}, challenge: '123'}, 
    });
    const response = httpMocks.createResponse();
    process.env.VERIFICATION_TOKEN = 'I\'m Good!';

    receivesSlackEvents(request, response);

    expect(response.statusCode).toBe(200);
    expect(response._getData()).toBe('123');

  });

});