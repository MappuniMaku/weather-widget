import React from 'react';
import { SettingsCitiesList } from '../SettingsCitiesList/SettingsCitiesList';
import { AddCityForm } from '../AddCityForm/AddCityForm';

import './SettingsPanel.scss';

export const SettingsPanel: React.FC = () => {
    return (
        <div className="SettingsPanel">
            <div className="SettingsPanel__main">
                <h2 className="SettingsPanel__heading">Settings</h2>

                <SettingsCitiesList />
            </div>

            <AddCityForm />
        </div>
    );
}
