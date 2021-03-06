import React from 'react';
import ReactDOM from 'react-dom';
import WeatherWidget from './WeatherWidget';
import store from './store/store';
import { Provider } from 'react-redux';
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
    const targetEl = document.querySelector('weather-widget');
    if (targetEl === null) return;

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <WeatherWidget />
            </Provider>
        </React.StrictMode>,
        targetEl
    );
});
