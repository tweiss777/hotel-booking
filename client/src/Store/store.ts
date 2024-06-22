import { configureStore } from "@reduxjs/toolkit";
import dimensionReducer from '../Slices/dimension.slice';

export const store = configureStore({
    reducer: {
        dimension: dimensionReducer
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

