import axios from 'axios';
import { CityWeatherDataResponse } from './types';

const apiKey = process.env.REACT_APP_API_KEY;

export const apiGetWeatherDataByCityName = async (city: string): Promise<CityWeatherDataResponse> => {
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`);
        return res.data;
    } catch {
        return new Promise((resolve, reject)  => reject(new Error('City not found')));
    }
};

export const apiGetWeatherDataByCoords = async (position: GeolocationPosition) : Promise<CityWeatherDataResponse> => {
    try {
        const { latitude: lat, longitude: lng } = position.coords;
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&lang=en`);
        return res.data;
    } catch {
        return new Promise((resolve, reject)  => reject(new Error('Could not get data for this location')));
    }
};
