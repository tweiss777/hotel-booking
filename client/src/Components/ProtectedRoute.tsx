import { useAppSelector } from '../hooks/redux.hooks';
import { Navigate } from 'react-router';
interface IProps {
    children: JSX.Element | JSX.Element[];
}

export default function ProtectedRoute({ children }: IProps) {
    const { userToken, userData } = useAppSelector((state) => state.auth);
    return userToken && userData ? <>{children}</> : <Navigate to={'/login'} />;
}
