import axios from 'axios';
import ConfictException from '../../Errors/Conflict.exception';
import BadRequestException from '../../Errors/BadRequest.exception';
export async function login(email: string, password: string) {
	try {
		const { data } = await axios.post('/api/v1/auth/login', {
			email,
			password,
		});
		return data;
	} catch (error: any) {
		if (error.response && error.response.status === 401) {
			throw new ClientForbiddenException(error.response.data.error);
		}
		throw new Error('Something Went wrong');
	}
}

export async function register(
	email: string,
	password: string,
	confirmPassword: string,
) {
	try {
		const { data } = await axios.post('/api/v1/auth/register', {
			email,
			password,
			confirmPassword,
		});
		return data;
	} catch (error: any) {
		if (error.response) {
			if (error.response.status === 409) {
				throw new ConfictException(error.response.data.error);
			}
			if (error.response.status === 400) {
				throw new BadRequestException(error.response.data.error);
			}
		}
		throw new Error(error.response.data.error);
	}
}
