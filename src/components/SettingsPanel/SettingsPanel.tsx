import React from 'react';
import { AddCityForm } from '../AddCityForm/AddCityForm';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeCity } from '../../store/citiesSlice';
import { ReactComponent as IconTrash } from '../../assets/icons/trash.svg';

import './SettingsPanel.scss';

export const SettingsPanel: React.FC = (props) => {
    const cities = useAppSelector(state => state.cities.items);
    const dispatch = useAppDispatch();

    return (
        <div className="SettingsPanel">
            <ul>
                {cities.map(city => (
                    <li key={city.id}>
                        <span>{city.name}</span>

                        <button
                            className="SettingsPanel__removeButton"
                            type="button"
                            onClick={() => dispatch(removeCity(city.id))}
                        >
                            <IconTrash className="SettingsPanel__removeButtonIcon" />
                        </button>
                    </li>
                ))}
            </ul>

            <AddCityForm />
        </div>
    );
}
