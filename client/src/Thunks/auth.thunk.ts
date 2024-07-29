import { createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '../Services/Login/login.service';
import BadRequestException from '../Errors/BadRequest.exception';
import ConfictException from '../Errors/Conflict.exception';
import UnauthorizedException from '../Errors/Unauthorized.exception';
import { jwtDecode, JwtPayload } from 'jwt-decode';
declare module "jwt-decode" {
    export interface JwtPayload{
        email: string;
        role: string;
    }

}



type RegisterParams = {
	email: string;
	password: string;
	confirmPassword: string;
};

type Response = {
    token: string,
    tokenPayload: JwtPayload
}


type LoginParams = {
	email: string;
	password: string;
};

const registerUser = createAsyncThunk<
	JwtPayload | undefined,
	RegisterParams,
	{ rejectValue: string[] }
>(
	'api/register',
	async ({ email, password, confirmPassword }, { rejectWithValue }) => {
		try {
			const { token } = await register(email, password, confirmPassword);
			const decodedJwt = jwtDecode(token)
			return decodedJwt;
		} catch (error: any) {
			if (
				error instanceof ConfictException ||
				error instanceof BadRequestException
			) {
				rejectWithValue(error.message.split(','));
				return;
			}
			rejectWithValue(['Internal server error']);
		}
	},
);

const loginUser = createAsyncThunk<
	Response,
	LoginParams,
	{ rejectValue: string[] }
>('api/login', async ({ email, password }, { rejectWithValue }) => {
	try {
		const { token } = await login(email, password);
		const decodedJwt: JwtPayload = jwtDecode(token);
         
        return {tokenPayload :decodedJwt, token} ;
	} catch (error: any) {
		if (error instanceof UnauthorizedException) {
			rejectWithValue(error.message.split(','));
			return;
		}
		rejectWithValue(['Internal server error']);
	}
});

export { registerUser, loginUser };
