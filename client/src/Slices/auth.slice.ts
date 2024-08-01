import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../Thunks/auth.thunk';
import { JwtPayload } from 'jwt-decode';
type Auth = {
	loading: boolean;
	userToken: string | null;
	userData: JwtPayload | null;
	errors: string[] | null;
	success: boolean;
};

const initialState: Auth = {
	loading: false,
	userToken: null,
	errors: null,
	success: false,
	userData: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
        setUserToken(state,{ payload }){
            state.userToken = payload
        },
        setTokenPayload(state,{ payload }){
            state.userData = payload
        }
    },
	extraReducers(builder) {
		builder.addCase(loginUser.pending, (state) => {
			state.errors = null;
			state.loading = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			state.userData = action?.payload.tokenPayload;
			state.userToken = action?.payload.token;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.loading = false;
			state.errors = action.payload as string[];
		});
		builder.addCase(registerUser.pending, (state) => {
			state.errors = null;
			state.loading = true;
		});
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			state.userData = action?.payload.tokenPayload;
			state.userToken = action?.payload.token;
		});
		builder.addCase(registerUser.rejected, (state, action) => {
			state.loading = false;
			state.errors = action.payload as string[];
		});
	},
});
export const { setUserToken, setTokenPayload } = authSlice.actions;
export default authSlice.reducer;
