import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CityWeatherDataResponse } from '../scripts/types';
import { apiGetWeatherDataByCityName } from '../scripts/api-methods';

export const getWeatherDataByCityName = createAsyncThunk('cities/addCity', (cityName: string) => {
    return apiGetWeatherDataByCityName(cityName);
});

type CitiesState = {
    items: CityWeatherDataResponse[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: CitiesState = {
    items: [],
    status: 'idle',
    error: null,
};

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setCities: (state, action: PayloadAction<Array<CityWeatherDataResponse>>) => {
            state.items = action.payload
        },
        removeCity: (state, action) => {
            state.items = state.items.filter((item => item.id !== action.payload));
        },
    },
    extraReducers: builder => {
        builder.addCase(getWeatherDataByCityName.pending, state => {
            state.status = 'loading';
        });
        builder.addCase(getWeatherDataByCityName.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items.push(action.payload);
        });
        builder.addCase(getWeatherDataByCityName.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message as string;
        });
    },
});

export const { setCities, removeCity } = citiesSlice.actions;

export default citiesSlice.reducer;
