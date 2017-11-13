###### Before You Read:
Currently, this doesn’t include the instructions for getting a bot up and running on your own slack channel. The following information is about the architecture, design, quirks, and future features of the bot. 

## Background
This is a simple slack weather bot, named weather-bot-app or @weatherbotapp, that reports the current weather for a given city.

- It was built with Node and Express, utilizes the Axios promise HTTP library and has unit tests in Jest. 

- The bot is subscribed to Slack channel events via the [Slack Events API](https://api.slack.com/events-api) and posts messages to Slack via the [chat.postMessage](https://api.slack.com/methods/chat.postMessage) method of the [Slack Web API](https://api.slack.com/web).

- It utilizes the [Open Weather Map API](https://openweathermap.org/current) to fetch weather data.

- Slack OAuth was handled following the [Hello World Slack OAuth](https://api.slack.com/tutorials/app-creation-and-oauth) tutorial and modifying it for the project. 

## System Architecture: 

A system design diagram is below:
> ![System-Design-Diagram](/diagrams/Weather-Bot-App-System-Design-Diagram.png?raw=true "System-Design-Diagram")

General Overview:

1. The bot subscribes to the channel events of a Slack Workspace through the Slack Events API.
2. Channel events are posted to the Weather-Bot-App server via the “slackchannelevents” endpoint and handled by the receiveSlackEvents handler.
3. This handler parses the events for messages that mention the bot by username, searching for a request for help or a request for the weather. 
  - Help requests are responded to with an example of how to request the weather. 
  - Weather requests are parsed, and a Get request is sent to the Open Weather Maps API with a query of the parsed location.

4. The resulting response is formatted and posted to the slack channel the request originated from by sending a Post request to the “chat.postMessage” endpoint of the Slack Web API. The response to a help request and any other responses from the bot are likewise posted to the same endpoint. 

Here’s a sequence diagram showcasing how the bot handles a weather request:
> ![Weather-Request-Sequence-Diagram](/diagrams/Weather-Request-Sequence-Diagram.png?raw=true "Weather-Request-Sequence-Diagram")


### Slack User - Bot interface:

- The weatherbot is quite simple and therefore has specific requirements for interaction. To learn about the requirements a user can enter “@weatherbotapp help” to receive instructions.

- To request weather information the user must enter “@weatherbotapp” and “weather in CITY_NAME?” or “weather in CITY_NAME, TWO_LETTER_COUNTRY_CODE?” Where the country code refers to the [ISO_3166 Country Code](https://en.wikipedia.org/wiki/ISO_3166-2).

- The bot will reply with “The current weather in CITY_NAME is CURRENT_WEATHER with a temperature of TEMPERATURE° Fahrenheit.” if the request is successful or one of three error messages otherwise. 

### Quirks:
TempEventLog

- The reason for the TempEventLog class and it’s instantiation for use with the “receiveSlackEvents” handler is to deal with the “graceful retries” from the Slack Events API. 

- If the Events API fails, it will resend the event a total of three times at intervals of immediately, one minute, and five minutes. 

- The TempEventLog serves as a way to ensure that events are not processed and responded to multiple times by storing the unique event_id of an event for six minutes.

- As not receiving a 200 response within three seconds is considered a failure condition, events are re-sent fairly frequently. 


## Scaling:

- This version of the weather-app-bot was built for internal integration within a single Slack Workspace and was not designed for scaling.

- For one, the TempEventLog would need to be replaced, perhaps with a Redis database. Rather quickly, having to call SetTimeOut to remove event_ids could cause a slow down or even a stack overflow.

- Furthermore, to function, the bot requires the creator to manually store and save the required authorization tokens and the unique username of the weather-app-bot. With no way to dynamically fetch OAuth tokens or the bot username, the app can only service a single workspace.

- I would also add the location validation feature mentioned under future features before scaling the application.

### Future Features:
Location validation

- Currently the OpenWeatherMap API validates location queries. If I were further extending this application, I would add location validation before querying the OpenWeatherMap API.

- The API includes a total of 216,169 cities, which is an easy number to validate from. With this, we could remove the requirement of adding a country code and instead make use of Slack’s interactive messages feature to ask the user which city they were referring to if multiple were found.

- Furthermore, by validating ahead of time, the OpenWeatherMap API could be queried with the “City ID” number which is recommended to ensure an unambiguous result. 


Saving a current city

- It would be neat to allow users to save a current city and not have to specify when asking the weather. This would be fairly simple, by saving a user’s username and the City ID of their city and an update to the message parsing function. 


