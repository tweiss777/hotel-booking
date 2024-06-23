import axios from 'axios';
import ClientForbiddenException from '../../Errors/ClientForbidden.exception';
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
