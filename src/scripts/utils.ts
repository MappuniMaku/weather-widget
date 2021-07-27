import { CityWeatherDataResponse } from './types';

export const getFullCityName = (city: CityWeatherDataResponse): string => (
    `${city.name}, ${city.sys.country}`
);

export const getTemperatureInCelsius = (temp: number): string => (
    `${Math.round(temp)}&#8451;`
);
