import React, { FormEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getWeatherDataByCityName } from '../../store/citiesSlice';

export const AddCityForm: React.FC = (props) => {
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
        <form onSubmit={e => searchCity(e)}>
            <input type="text" value={cityName} onChange={e => setCityName(e.target.value)} />
            <button disabled={!cityName || isLoading}>Найти</button>
        </form>
    );
}
