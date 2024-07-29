import { createSlice } from '@reduxjs/toolkit';

type Auth = {
    loading: boolean;
    userInfo: object;
    userToken: string | null;
    error: boolean | null;
    success: boolean;
};

const initialState: Auth = {
    loading: false,
    userInfo: {},
    userToken: null,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        
    },
});

export default authSlice.reducer;
