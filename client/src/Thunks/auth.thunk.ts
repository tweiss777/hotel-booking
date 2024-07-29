import { createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '../Services/Login/login.service';
import BadRequestException from '../Errors/BadRequest.exception';
import UnauthorizedException from '../Errors/Unauthorized.exception';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import ConflictException from '../Errors/Conflict.exception';
declare module "jwt-decode" {
    export interface JwtPayload{
        email: string;
        role: string;
    }

}

// Define the parameter and return types
type RegisterParams = {
  email: string;
  password: string;
  confirmPassword: string;
};

type Response = {
  token: string;
  tokenPayload: JwtPayload;
};

type LoginParams = {
  email: string;
  password: string;
};


const registerUser = createAsyncThunk<
  Response,
  RegisterParams,
  { rejectValue: string[] }
>(
  'api/register',
  async ({ email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const { token } = await register(email, password, confirmPassword);
      const decodedJwt = jwtDecode<JwtPayload>(token);
      return { token, tokenPayload: decodedJwt };
    } catch (error: any) {
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        return rejectWithValue(error.message.split(','));
      }
      return rejectWithValue(['Internal server error']);
    }
  }
);

const loginUser = createAsyncThunk<
  Response,
  LoginParams,
  { rejectValue: string[] }
>('api/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { token } = await login(email, password);
    const decodedJwt = jwtDecode<JwtPayload>(token);
    console.log('decodedJwt', decodedJwt);
    return { token, tokenPayload: decodedJwt };
  } catch (error: any) {
    if (error instanceof UnauthorizedException) {
      return rejectWithValue(error.message.split(','));
    }
    return rejectWithValue(['Internal server error']);
  }
});

export { registerUser, loginUser };
