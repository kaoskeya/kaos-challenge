const axios = require("axios");

exports.getWeather = async (city, state) => {
  // get weather data for the city
  try {
    const weather = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
    );

    return weather.data.current;
  } catch (error) {}

  // get weather data for the state if city data is not available
  try {
    const weather = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${state}`
    );

    return weather.data.current;
  } catch (error) {
    // If data not found, return null data
    return {
      temp_c: 0,
      is_day: false,
      humidity: 0,
      cloud: false,
      uv: 0,
    };
  }
};
