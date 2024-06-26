import { Card, Input, Button, Form, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { INewUser } from '../../../Interfaces/INewUser';
interface IProps {
	loading?: boolean;
	error?: string[] | null;
	handleRegistration: (credentials: INewUser) => void;
}

export default function RegistrationForm({
	loading,
	error,
	handleRegistration,
}: IProps) {
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
	const {
		handleSubmit,
		control,
		getValues,
		formState: { errors: clientErrors },
	} = useForm<INewUser>({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	function onRegistration() {
		const values: INewUser = getValues();
		if (!passwordsMatch) setPasswordsMatch(true);
		const { password, confirmPassword } = values;
		if (password !== confirmPassword) {
			setPasswordsMatch(false);
			return;
		}
		handleRegistration(values);
	}

	return (
		<Card bordered title="Register">
			{error && (
				<Alert
					description={
						<ul>
							{error instanceof Array
								? error.map((error: string, i: number) => (
										<li key={i}>{error}</li>
									))
								: error}
						</ul>
					}
					message={'Error'}
					type="error"
					showIcon
				/>
			)}
			{!passwordsMatch && (
				<Alert message="Passwords do not match" type="error" showIcon />
			)}
			<Form layout="vertical" onFinish={handleSubmit(onRegistration)}>
				<Controller
					control={control}
					name="email"
					rules={{
						required: {
							value: true,
							message: 'Email is required',
						},
						pattern: {
							value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
							message: 'Invalid email',
						},
					}}
					render={({ field }) => (
						<>
							<Form.Item label="Email">
								<Input {...field} />
							</Form.Item>
							{clientErrors.email?.message && (
								<p className="text-error">{clientErrors.email.message}</p>
							)}
						</>
					)}
				/>
				<Controller
					control={control}
					name="password"
					rules={{
						required: {
							value: true,
							message: 'Password is required',
						},
					}}
					render={({ field }) => (
						<>
							<Form.Item label="Password">
								<Input.Password {...field} />
							</Form.Item>
							{clientErrors.password?.message && (
								<p className="text-error">{clientErrors.password.message}</p>
							)}
						</>
					)}
				/>

				<Controller
					control={control}
					name="confirmPassword"
					rules={{
						required: {
							value: true,
							message: 'Confirm password is required',
						},
					}}
					render={({ field }) => (
						<>
							<Form.Item label="Confirm Password">
								<Input.Password {...field} />
							</Form.Item>
							{clientErrors.confirmPassword?.message && (
								<p className="text-error">
									{clientErrors.confirmPassword.message}
								</p>
							)}
						</>
					)}
				/>
				<Form.Item>
					<Button
						className="login-btn"
						loading={loading}
						type="primary"
						htmlType="submit"
					>
						Sign up
					</Button>
				</Form.Item>
				<Link to="/login">Already have an account? Login here!</Link>
			</Form>
		</Card>
	);
}
