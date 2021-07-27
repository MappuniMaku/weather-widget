import React, { FormEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getWeatherDataByCityName } from '../../store/citiesSlice';

import { ReactComponent as IconEnter } from "../../assets/icons/enter.svg";

import './AddCityForm.scss';

const inputId = 'add-city-input';

export const AddCityForm: React.FC = () => {
    const [cityName, setCityName] = useState<string>('');
    const status = useAppSelector(state => state.cities.status);
    const dispatch = useAppDispatch();

    const isLoading = status === 'loading';

    const searchCity = (e: FormEvent): void => {
        e.preventDefault();
        if (isLoading) return;
        if (cityName === '') return;
        dispatch(getWeatherDataByCityName(cityName));
    };

    return (
        <form className="AddCityForm" onSubmit={e => searchCity(e)}>
            <label htmlFor={inputId} className="AddCityForm__heading">
                Add Location:
            </label>

            <div className="AddCityForm__body">
                <input
                    id={inputId}
                    className="AddCityForm__input"
                    type="text"
                    value={cityName}
                    onChange={e => setCityName(e.target.value)}
                />

                <button
                    className="AddCityForm__submitButton"
                    disabled={!cityName || isLoading}
                >
                    <IconEnter className="AddCityForm__submitButtonIcon" />
                </button>
            </div>
        </form>
    );
}
