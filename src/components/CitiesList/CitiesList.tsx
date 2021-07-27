import React from 'react';
import { useAppSelector } from '../../store/hooks';

import './CitiesList.scss';

export const CitiesList: React.FC = () => {
    const cities = useAppSelector(state => state.cities.items);

    return (
        <ul className="CitiesList">
            {cities.length > 0 ? (cities.map(city => {
                const [weather] = city.weather;

                return (
                    <li key={city.id}>
                        <span>{`${city.name}, ${city.sys.country}`}</span>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                            alt={weather.description}
                        />
                        <span>{Math.round(city.main.temp)}&#8451;</span>
                    </li>
                )
            })) : (
                <span>No cities added yet</span>
            )}
        </ul>
    );
}
