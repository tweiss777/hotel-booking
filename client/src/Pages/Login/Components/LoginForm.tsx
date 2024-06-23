import { Input, Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
interface IProps {
	loading?: boolean;
	handleSubmit: (credentials: { email: string; password: string }) => void;
}
export default function LoginForm({ handleSubmit }: IProps) {
	const [loginForm, setLoginForm] = useState({ email: '', password: '' });
	function onSubmt() {
		handleSubmit(loginForm);
	}

	function handleInputChange(value: { email: string } | { password: string }) {
		const key: string = Object.keys(value)[0];
		setLoginForm({ ...loginForm, [key]: value });
	}

	return (
		<Form
			layout="vertical"
			onValuesChange={handleInputChange}
			onFinish={onSubmt}
		>
			<Form.Item
				label="Email"
				name="email"
				rules={[
					{
						required: true,
						message: 'Please input a valid email!',
						pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
					},
				]}
				tooltip="required field"
			>
				<Input type="email" value={loginForm.email} />
			</Form.Item>
			<Form.Item
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
				tooltip="required field"
			>
				<Input type="password" value={loginForm.password} />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Login
				</Button>
			</Form.Item>
			<Link to="/register">Don't have an account? Sign up here!</Link>
		</Form>
	);
}