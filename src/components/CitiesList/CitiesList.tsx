import React from 'react';
import { useAppSelector } from '../../store/hooks';

import { CitiesListItem } from '../CitiesListItem/CitiesListItem';

import './CitiesList.scss';

export const CitiesList: React.FC = () => {
    const cities = useAppSelector(state => state.cities.items);

    return (
        <div className="CitiesList">
            {cities.length > 0 ? (
                <ul className="CitiesList__list">
                    {cities.map(city => (
                        <li key={city.id} className="CitiesList__item">
                            <CitiesListItem city={city} />
                        </li>
                    ))}
                </ul>
            ) : (
                <span>No cities added yet</span>
            )}
        </div>
    );
}
