import LoginForm from './Components/LoginForm';
import './styles.scss';
import '../../scss/grid.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import LoginHeader from './Components/LoginHeader';
import BackgroundHeader from './Components/BackgroundHeader';
import RegistrationForm from './Components/RegistrationForm';
import { useLocation } from 'react-router';
import { INewUser } from '../../Interfaces/INewUser';
import { loginUser, registerUser } from '../../Thunks/auth.thunk';
export default function Login() {
    const width = useAppSelector((state) => state.dimension.width);
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const { errors, loading } = useAppSelector((state) => state.auth);
    async function handleSubmit(loginForm: { email: string; password: string }) {
       dispatch(loginUser(loginForm)) 
    }

    async function handleRegistration(registrationForm: INewUser) {
        dispatch(registerUser(registrationForm)) 
    }
    return (
        <div className="login-container">
            <LoginHeader />
            <div className="custom-card-container">
                {pathname.toLowerCase() === '/register' ? (
                    <RegistrationForm
                        loading={loading}
                        error={errors}
                        handleRegistration={handleRegistration}
                    />
                ) : (
                    <LoginForm
                        error={errors}
                        loading={loading}
                        handleSubmit={handleSubmit}
                    />
                )}
            </div>
            {width > 750 && <BackgroundHeader />}
        </div>
    );
}
