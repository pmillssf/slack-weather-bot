require('dotenv').config();
const axios = require('axios');

const fetchWeather = (location) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${process.env.WEATHER_KEY}`);
};

const formatWeather = (weatherAPIResponse) => {
  const { weather, main, name } = weatherAPIResponse;
  const weatherDictionary = {
    200: 'thunderstorms with light rain',
    201: 'thunderstorms with rain',
    202: 'thunderstorms with heavy rain',
    210: 'light thunderstorms',
    211: 'thunderstorms',
    212: 'heavy thunderstorms',
    221: 'ragged thunderstorms',
    230: 'thunderstorms with light drizzle',
    231: 'thunderstorms with drizzle',
    232: 'thunderstorms with heavy drizzle',
    300: 'a light intensity drizzle',
    301: 'a drizzle',
    302: 'a heavy intensity drizzle',
    310: 'a light intensity drizzle rain',
    311: 'drizzling rain',
    312: 'a heavy intensity drizzle rain',
    313: 'rain showers and drizzle',
    314: 'heavy rain showers and drizzle',
    321: 'a rain shower drizzle',
    500: 'a light rain',
    501: 'a moderate rain',
    502: 'a heavy intensity rain',
    503: 'a very heavy rain',
    504: 'an extreme rain',
    511: 'a freezing rain',
    520: 'a light intensity rain shower',
    521: 'a rain shower',
    522: 'a heavy intensity rain shower',
    531: 'a ragged rain shower',
    600: 'a light snow',
    601: 'snow',
    602: 'a heavy snow',
    611: 'sleet',
    612: 'shower sleet',
    615: 'a light rain and snow',
    616: 'rain and snow',
    620: 'a light snow shower',
    621: 'a snow shower',
    622: 'a heavy snow shower',
    701: 'mist',
    711: 'smoke',
    721: 'haze',
    731: 'sand and dust whirls',
    741: 'fog',
    751: 'sand',
    761: 'dust',
    762: 'volcanic ash',
    771: 'squalls',
    781: 'tornados',
    800: 'a clear sky',
    801: 'a few clouds',
    802: 'scattered clouds',
    803: 'broken clouds',
    804: 'overcast clouds',
    900: 'tornados',
    901: 'a tropical storm',
    902: 'a hurricane',
    903: 'cold',
    904: 'hot',
    905: 'windy',
    906: 'hail',
    951: 'calm',
    952: 'a light breeze',
    953: 'a gentle breeze',
    954: 'a moderate breeze',
    955: 'a fresh breeze',
    956: 'a strong breeze',
    957: 'high winds, near gale',
    958: 'gale winds',
    959: 'a severe gale',
    960: 'a storm',
    961: 'a violent storm',
    962: 'a hurricane',
  };
  return `The current weather in ${name} is ${weatherDictionary[weather[0].id]} with a temperature of ${main.temp}° Farhrenheit.`;
};

module.exports = {
  fetchWeather,
  formatWeather,
};

