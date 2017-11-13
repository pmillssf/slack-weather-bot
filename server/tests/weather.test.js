const { fetchWeather, formatWeather } = require('../weather');
const { mockWeatherAPIResponse } = require('./mockData');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

describe('Testing weather.js', () => {

  describe('fetchWeather', () => {

    beforeEach(() => {
      mock.reset();
    });

    it('Should send a Get request to https://api.openweathermap.org/data/2.5/weather', () => {
      expect.assertions(1);

      mock.onGet()
        .reply(config => {
          if (config.url.includes('https://api.openweathermap.org/data/2.5/weather')) {
            return [200, 'https://api.openweathermap.org/data/2.5/weather'];
          }
          return [400, 'Fail'];
        });

      const city = "SanFrancisco";

      expect(fetchWeather(city)).resolves.toHaveProperty('data', 'https://api.openweathermap.org/data/2.5/weather');
    });

    it('Should set the temperature units to imperial in the request', () => {
      expect.assertions(1);

      mock.onGet()
        .reply(config => {
          if (config.url.includes('units=imperial')) {
            return [200, {units: 'imperial'}];
          }
          return [400, 'Fail'];
        });

      const city = "SanFrancisco";

      expect(fetchWeather(city)).resolves.toHaveProperty('data.units', 'imperial');
    });

    it('Should pass in the location given as a query in the request', () => {
      expect.assertions(1);

      mock.onGet()
        .reply(config => {
          if (config.url.includes('q=SanFrancisco')) {
            return [200, {q: 'SanFrancisco'}];
          }
          return [400, 'Fail'];
        });

      const city = "SanFrancisco";

      expect(fetchWeather(city)).resolves.toHaveProperty('data.q', 'SanFrancisco');
    });

  });

  describe('formatWeather', () => {

    it('Should format correctly', () => {
      expect(formatWeather(mockWeatherAPIResponse.sanFrancisco))
      .toEqual('The current weather in San Francisco is broken clouds with a temperature of 65.25° Fahrenheit.');
      
      expect(formatWeather(mockWeatherAPIResponse.portland))
      .toEqual('The current weather in Portland is a light rain with a temperature of 51.12° Fahrenheit.')

      expect(formatWeather(mockWeatherAPIResponse.paris))
      .toEqual('The current weather in Paris is mist with a temperature of 59.86° Fahrenheit.')
    });

  });

});