import { CityWeatherDataResponse } from './types';

export const getFullCityName = (city: CityWeatherDataResponse): string => (
    `${city.name}, ${city.sys.country}`
);

export const getTemperatureInCelsius = (temp: number): string => (
    `${Math.round(temp)}&#8451;`
);

export const getWindDirectionFromDeg = (deg: number): string => {
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return directions[(Math.round(deg / 22.5) % 16)];
};

export const formatNumberToOneDigitAfterDecimalPoint = (number: number): string => Number(number).toFixed(1);
