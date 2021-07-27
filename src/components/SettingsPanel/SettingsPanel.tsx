import React from 'react';
import { SettingsCitiesList } from '../SettingsCitiesList/SettingsCitiesList';
import { AddCityForm } from '../AddCityForm/AddCityForm';

import './SettingsPanel.scss';

export const SettingsPanel: React.FC = (props) => {
    return (
        <div className="SettingsPanel">
            <SettingsCitiesList />

            <AddCityForm />
        </div>
    );
}
