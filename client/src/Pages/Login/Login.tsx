import LoginForm from './Components/LoginForm';
import './styles.scss';
import '../../scss/grid.scss';
import { useAppSelector } from '../../hooks/redux.hooks';
import LoginHeader from './Components/LoginHeader';
import { useState } from 'react';
import { login } from '../../Services/Login/login.service';
import ClientForbiddenException from '../../Errors/ClientForbidden.exception';
import BackgroundHeader from './Components/BackgroundHeader';
export default function Login() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const width = useAppSelector((state) => state.dimension.width);

    async function handleSubmit(loginForm: { email: string; password: string }) {
        try {
            if (error) setError(null);
            setIsLoading(true);
            const result = await login(loginForm.email, loginForm.password);
            console.log(result);
            // todo store the jwt in cookies or in localstorage
        } catch (error) {
            if (error instanceof ClientForbiddenException) {
                setError(error.message);
                return;
            }
            setError('Internal server error... :(');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="login-container">
            <LoginHeader />
            <div className="custom-card-container">
                <LoginForm
                    error={error}
                    loading={isLoading}
                    handleSubmit={handleSubmit}
                />
            </div>
            {width > 750 && <BackgroundHeader />}
        </div>
    );
}
