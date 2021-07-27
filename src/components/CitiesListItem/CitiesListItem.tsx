import React from 'react';
import { CityWeatherDataResponse } from '../../scripts/types';
import { getFullCityName, getTemperatureInCelsius } from '../../scripts/utils';

import './CitiesListItem.scss';

type CitiesListItemProps = {
    city: CityWeatherDataResponse;
};

export const CitiesListItem: React.FC<CitiesListItemProps> = (props) => {
    const { city } = props;
    const [weather] = city.weather;

    let weatherDescription = `Feels like ${getTemperatureInCelsius(city.main.feels_like)}.`;
    city.weather.forEach(item => {
        const desc = item.description[0].toUpperCase() + item.description.slice(1);
        weatherDescription += ` ${desc}.`;
    });

    return (
        <div className="CitiesListItem">
            <span className="CitiesListItem__cityName">
                {getFullCityName(city)}
            </span>

            <div className="CitiesListItem__main">
                <img
                    className="CitiesListItem__weatherIcon"
                    src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                />

                <span
                    className="CitiesListItem__currentTemp"
                    dangerouslySetInnerHTML={{ __html: getTemperatureInCelsius(city.main.temp) }}
                />
            </div>

            <span
                className="CitiesListItem__weatherDescription"
                dangerouslySetInnerHTML={{ __html: weatherDescription }}
            />
        </div>
    );
}
