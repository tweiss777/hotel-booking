import { createRef } from 'react';
import App from '../App';
import Login from '../Pages/Login/Login';
import { createBrowserRouter } from 'react-router-dom';
export const routes = [
	{
		path: '/',
		element: <h1>test element</h1>,
		name: 'Home',
		nodeRef: createRef(),
	},
	{
		path: '/login',
		name: 'Login',
		element: <Login />,
		nodeRef: createRef(),
	},
	{
		path: '/register',
		name: 'Register',
		element: <Login />,
		nodeRef: createRef(),
	},
];

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: routes.map((route) => ({
			index: route.path === '/',
			path: route.path === '/' ? undefined : route.path,
			element: route.element,
		})),
	},
]);
