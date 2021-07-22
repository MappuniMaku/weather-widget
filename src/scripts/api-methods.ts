import axios from 'axios';
import { CityWeatherDataResponse } from './types';

const apiKey = process.env.REACT_APP_API_KEY;

export const getWeatherDataByCityName = async (city: string): Promise<CityWeatherDataResponse | null> => {
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`);
        return res.data;
    } catch {
        return new Promise(resolve => resolve(null));
    }
};
