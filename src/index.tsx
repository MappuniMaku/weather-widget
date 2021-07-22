import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import WeatherWidget from './WeatherWidget';

const targetEl = document.querySelector('weather-widget');
if (targetEl !== null) {
    ReactDOM.render(
        <React.StrictMode>
            <WeatherWidget />
        </React.StrictMode>,
        targetEl
    );
}
