import axios from 'axios';
import { API_KEY } from '../utils/auth';

export const getWeatherByCityName = async (cityName, units) => {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&APPID=${API_KEY}`;
    const { data: weather } = await axios.get(url);
    return weather;
  } catch (e) {
    console.error(e);
  }
};

export const getFiveNextDaysWeatherByCityName = async (cityName, units) => {
  try {
    console.log(cityName, units);
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&APPID=${API_KEY}`;
    const { data: weather } = await axios.get(url);
    console.log('weather', weather);
    return weather;
  } catch (e) {
    console.error(e);
  }
};
