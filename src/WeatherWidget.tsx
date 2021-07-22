import React, { useState } from 'react';

import { CitiesList } from './components/CitiesList/CitiesList';
import { SettingsPanel } from './components/SettingsPanel/SettingsPanel';

import { ReactComponent as IconSettings } from './assets/icons/settings.svg';
import { ReactComponent as IconClose } from './assets/icons/close.svg';

import './WeatherWidget.scss';

const WeatherWidget: React.FC = () => {
    const [isSettingsPanelOpen, setSettingsPanelOpen] = useState<boolean>(false);

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
