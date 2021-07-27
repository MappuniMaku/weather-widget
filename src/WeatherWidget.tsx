import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from './store/hooks';
import { getWeatherDataByCoords, getWeatherDataByCityName, setCities } from './store/citiesSlice';
import { CitiesListType } from './scripts/types';
import { LOCAL_STORAGE } from './scripts/constants';

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
            const localStorageCities = localStorage.getItem(LOCAL_STORAGE.CITIES);

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
        localStorage.setItem(LOCAL_STORAGE.CITIES, JSON.stringify(cities));
    }, [cities]);

    return (
        <div className="WeatherWidget">
            <button
                className="WeatherWidget__settingsButton"
                onClick={() => {setSettingsPanelOpen(!isSettingsPanelOpen)}}
            >
                {isSettingsPanelOpen ? (
                    <IconClose
                        className="
                            WeatherWidget__settingsButtonIcon
                            WeatherWidget__settingsButtonIcon--close
                        "
                    />
                ) : (
                    <IconSettings
                        className="
                            WeatherWidget__settingsButtonIcon
                            WeatherWidget__settingsButtonIcon--settings
                        "
                    />
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
