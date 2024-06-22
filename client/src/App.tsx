import React, { useEffect } from 'react';
import './App.css';
import { Outlet } from 'react-router';
import { useAppDispatch } from './hooks/redux.hooks';
import { setWidth, setHeight } from './Slices/dimension.slice';

function App() {
	const dispatch = useAppDispatch();
	function setAppHeight() {
		dispatch(setHeight());
	}

	function setAppWidth() {
		dispatch(setWidth());
	}

	useEffect(() => {
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
