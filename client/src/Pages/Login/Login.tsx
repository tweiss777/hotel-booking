import LoginForm from './Components/LoginForm';
import './styles.scss';
import '../../scss/grid.scss';
import { useAppSelector } from '../../hooks/redux.hooks';
import LoginHeader from './Components/LoginHeader';
import { useState } from 'react';
import { login, register } from '../../Services/Login/login.service';
import BackgroundHeader from './Components/BackgroundHeader';
import RegistrationForm from './Components/RegistrationForm';
import { useLocation } from 'react-router';
import BadRequestException from '../../Errors/BadRequest.exception';
import ConflictException from '../../Errors/Conflict.exception';
import { INewUser } from '../../Interfaces/INewUser';
import UnauthorizedException from '../../Errors/Unauthorized.exception';
export default function Login() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]|  null>(null);
    const width = useAppSelector((state) => state.dimension.width);
    const { pathname } = useLocation();
    async function handleSubmit(loginForm: { email: string; password: string }) {
        try {
            if (error) setError(null);
            setIsLoading(true);
            const result = await login(loginForm.email, loginForm.password);
            console.log(result);
            // todo store the jwt in cookies or in localstorage
        } catch (error: any) {
            if (error instanceof UnauthorizedException) {
                setError(error.message.split(','));
                return;
            }
            setError(['Internal server error... :(']);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRegistration(registrationForm: INewUser) {
        try {
            if (error) setError(null);
            setIsLoading(true);
            const { email, password, confirmPassword } = registrationForm;
            const result = await register(email, password, confirmPassword);
            console.log(result);
            // todo store the jwt in either localstorage or cookie
        } catch (error: any) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
            ) {
                setError(error.message.split(','));
                return;
            }
            setError(['Internal server error... :(']);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="login-container">
            <LoginHeader />
            <div className="custom-card-container">
                {pathname.toLowerCase() === '/register' ? (
                    <RegistrationForm
                        loading={isLoading}
                        error={error}
                        handleRegistration={handleRegistration}
                    />
                ) : (
                    <LoginForm
                        error={error}
                        loading={isLoading}
                        handleSubmit={handleSubmit}
                    />
                )}
            </div>
            {width > 750 && <BackgroundHeader />}
        </div>
    );
}
