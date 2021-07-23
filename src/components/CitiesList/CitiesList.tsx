import React from 'react';
import { useAppSelector } from '../../store/hooks';

export const CitiesList: React.FC = () => {
    const cities = useAppSelector(state => state.cities.items);

    return (
        <ul className="CitiesList">
            {cities.length > 0 ? (cities.map(city => {
                const [weather] = city.weather;

                return (
                    <li key={city.id}>
                        <span>{city.name}</span>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                            alt={weather.description}
                        />
                    </li>
                )
            })) : (
                <span>Вы пока не добавили города</span>
            )}
        </ul>
    );
}
