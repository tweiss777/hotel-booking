import { useEffect } from 'react';
import './App.css';
import { Outlet } from 'react-router';
import { useAppDispatch } from './hooks/redux.hooks';
import { setWidth, setHeight } from './Slices/dimension.slice';
import { setTokenPayload, setUserToken } from './Slices/auth.slice';
import { jwtDecode } from 'jwt-decode';

function App() {
	const dispatch = useAppDispatch();
	function setAppHeight() {
		dispatch(setHeight());
	}

	function setAppWidth() {
		dispatch(setWidth());
	}

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const tokenPayload = jwtDecode(token);
			dispatch(setUserToken(token));
			dispatch(setTokenPayload(tokenPayload));
		}
		window.addEventListener('resize', setAppHeight);
		window.addEventListener('resize', setAppWidth);

		return () => {
			window.removeEventListener('resize', setAppHeight);
			window.removeEventListener('resize', setAppWidth);
		};
	}, []);

	return (
		<div>
			<Outlet />
		</div>
	);
}

export default App;
