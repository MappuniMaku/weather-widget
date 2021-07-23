import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from './store/hooks';
import { getWeatherDataByCoords, getWeatherDataByCityName, setCities } from './store/citiesSlice';
import { CitiesListType } from './scripts/types';

import { CitiesList } from './components/CitiesList/CitiesList';
import { SettingsPanel } from './components/SettingsPanel/SettingsPanel';

import { ReactComponent as IconSettings } from './assets/icons/settings.svg';
import { ReactComponent as IconClose } from './assets/icons/close.svg';

import './WeatherWidget.scss';

const WeatherWidget: React.FC = () => {
    const [isSettingsPanelOpen, setSettingsPanelOpen] = useState<boolean>(false);

    const cities = useAppSelector(state => state.cities.items);
    const dispatch = useAppDispatch();

    const getLocation = () => {
        const success = (position: GeolocationPosition) => {
            dispatch(getWeatherDataByCoords(position));
        };

        const error = () => {
            console.log('Unable to get location');
        }

        navigator.geolocation?.getCurrentPosition(success, error);
    };

    useEffect(() => {
        try {
            const localStorageCities = localStorage.getItem('cities');

            if (localStorageCities !== null) {
                const parsedCities: CitiesListType = JSON.parse(localStorageCities);
                dispatch(setCities(parsedCities));
                parsedCities.forEach(city => {
                    dispatch(getWeatherDataByCityName(city.name));
                });
            }

            if (localStorageCities === null) {
                getLocation();
            }
        } catch {}
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(cities));
    }, [cities]);

    return (
        <div className="WeatherWidget">
            Виджет погоды
            <button
                className="WeatherWidget__settingsButton"
                onClick={() => {setSettingsPanelOpen(!isSettingsPanelOpen)}}
            >
                {isSettingsPanelOpen ? (
                    <IconClose className="WeatherWidget__settingsButtonIcon" />
                ) : (
                    <IconSettings className="WeatherWidget__settingsButtonIcon" />
                )}
            </button>

            {isSettingsPanelOpen ? (
                <SettingsPanel />
            ) : (
                <CitiesList />
            )}
        </div>
    );
}

export default WeatherWidget;
