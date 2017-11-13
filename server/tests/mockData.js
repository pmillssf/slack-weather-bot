const mockWeatherAPIResponse = {
	sanFrancisco: {
	  "coord": {
	    "lon": -122.42,
	    "lat": 37.77
	  },
	  "weather": [
	    {
	      "id": 803,
	      "main": "Clouds",
	      "description": "broken clouds",
	      "icon": "04d"
	    }
	  ],
	  "base": "stations",
	  "main": {
	    "temp": 65.25,
	    "pressure": 1022,
	    "humidity": 77,
	    "temp_min": 62.6,
	    "temp_max": 68
	  },
	  "visibility": 16093,
	  "wind": {
	    "speed": 11.41,
	    "deg": 180
	  },
	  "clouds": {
	    "all": 75
	  },
	  "dt": 1510601700,
	  "sys": {
	    "type": 1,
	    "id": 392,
	    "message": 0.1692,
	    "country": "US",
	    "sunrise": 1510584540,
	    "sunset": 1510621132
	  },
	  "id": 5391959,
	  "name": "San Francisco",
	  "cod": 200
	},
	paris: {
	  "coord": {
	    "lon": -95.56,
	    "lat": 33.66
	  },
	  "weather": [
	    {
	      "id": 701,
	      "main": "Mist",
	      "description": "mist",
	      "icon": "50d"
	    }
	  ],
	  "base": "stations",
	  "main": {
	    "temp": 59.86,
	    "pressure": 1027,
	    "humidity": 87,
	    "temp_min": 59,
	    "temp_max": 60.8
	  },
	  "visibility": 8047,
	  "wind": {
	    "speed": 9.17,
	    "deg": 110
	  },
	  "clouds": {
	    "all": 90
	  },
	  "dt": 1510601700,
	  "sys": {
	    "type": 1,
	    "id": 2726,
	    "message": 0.1643,
	    "country": "US",
	    "sunrise": 1510577595,
	    "sunset": 1510615186
	  },
	  "id": 4717560,
	  "name": "Paris",
	  "cod": 200
	},
	portland: {
	  "coord": {
	    "lon": -122.68,
	    "lat": 45.52
	  },
	  "weather": [
	    {
	      "id": 500,
	      "main": "Rain",
	      "description": "light rain",
	      "icon": "10d"
	    }
	  ],
	  "base": "stations",
	  "main": {
	    "temp": 51.12,
	    "pressure": 1010,
	    "humidity": 76,
	    "temp_min": 48.2,
	    "temp_max": 53.6
	  },
	  "visibility": 16093,
	  "wind": {
	    "speed": 14.99,
	    "deg": 160,
	    "gust": 10.3
	  },
	  "clouds": {
	    "all": 75
	  },
	  "dt": 1510602000,
	  "sys": {
	    "type": 1,
	    "id": 2938,
	    "message": 0.1719,
	    "country": "US",
	    "sunrise": 1510585723,
	    "sunset": 1510620068
	  },
	  "id": 5746545,
	  "name": "Portland",
	  "cod": 200
	}
};

module.exports = {
	mockWeatherAPIResponse,
};
