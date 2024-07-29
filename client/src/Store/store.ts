import { configureStore } from "@reduxjs/toolkit";
import dimensionReducer from '../Slices/dimension.slice';
import authReducer from '../Slices/auth.slice';

export const store = configureStore({
    reducer: {
        dimension: dimensionReducer,
        auth: authReducer
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

