const httpMocks = require('node-mocks-http');
const { authSlackButton, authRedirect } = require('../slackAuth_handlers');

describe('Testing Slack OAuth Handlers', () => {

  describe('authSlackButton', () => {
  
    it('Should respond to a GET request with the button html', () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v0.1/auth',
      });
      const response = httpMocks.createResponse();
      response.filePath = '';
      response.sendFile = function(filePath) {
        this.filePath = filePath;
      };

      authSlackButton(request, response);

      const responseFilePathEnd = response.filePath.slice(response.filePath.length - 24, response.filePath.length);
      
      expect(responseFilePathEnd).toBe('client/add_to_slack.html');
    });

  });

});