import React from 'react';
import { CityWeatherDataResponse } from '../../scripts/types';
import {
    getFullCityName,
    getTemperatureInCelsius,
    getWindDirectionFromDeg,
    formatNumberToOneDigitAfterDecimalPoint
} from '../../scripts/utils';

import { ReactComponent as IconCompass } from "../../assets/icons/compass.svg";
import { ReactComponent as IconPressure } from "../../assets/icons/pressure.svg";

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

            <div className="CitiesListItem__additionalInfo">
                <div className="CitiesListItem__additionalInfoItem">
                    <IconCompass className="CitiesListItem__additionalInfoIcon" />

                    <span className="CitiesListItem__additionalInfoText">
                        {`${formatNumberToOneDigitAfterDecimalPoint(city.wind.speed)}m/s`}
                        &nbsp;
                        {getWindDirectionFromDeg(city.wind.deg)}
                    </span>
                </div>

                <div className="CitiesListItem__additionalInfoItem">
                    <IconPressure className="CitiesListItem__additionalInfoIcon" />

                    <span className="CitiesListItem__additionalInfoText">
                        {`${city.main.pressure}hPa`}
                    </span>
                </div>

                <div className="CitiesListItem__additionalInfoItem">
                    <span className="CitiesListItem__additionalInfoText">
                        {`Humidity: ${city.main.humidity}%`}
                    </span>
                </div>

                <div className="CitiesListItem__additionalInfoItem">
                    <span className="CitiesListItem__additionalInfoText">
                        {`Visibility: ${formatNumberToOneDigitAfterDecimalPoint(city.visibility / 1000)}km`}
                    </span>
                </div>
            </div>
        </div>
    );
}
