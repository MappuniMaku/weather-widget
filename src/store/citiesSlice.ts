import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CitiesListType } from '../scripts/types';
import { apiGetWeatherDataByCityName, apiGetWeatherDataByCoords } from '../scripts/api-methods';

export const getWeatherDataByCityName = createAsyncThunk('cities/addCity', (cityName: string) => {
    return apiGetWeatherDataByCityName(cityName);
});

export const getWeatherDataByCoords = createAsyncThunk('cities/addCity', (position: GeolocationPosition) => {
    return apiGetWeatherDataByCoords(position);
});

type CitiesState = {
    items: CitiesListType;
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
        setCities: (state, action: PayloadAction<CitiesListType>) => {
            state.items = action.payload
        },
        removeCity: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item => item.id !== action.payload));
        },
    },
    extraReducers: builder => {
        builder.addCase(getWeatherDataByCityName.pending, state => {
            state.status = 'loading';
        });
        builder.addCase(getWeatherDataByCityName.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const cityIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (cityIndex > -1) {
                state.items[cityIndex] = action.payload;
                return;
            }
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
