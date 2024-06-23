import { Card } from 'antd';
import LoginForm from './Components/LoginForm';
import './styles.scss';
import '../../scss/grid.scss';
import { useAppSelector } from '../../hooks/redux.hooks';
export default function Login() {
	const width = useAppSelector((state) => state.dimension.width);
	function handleSubmit(loginForm: { email: string; password: string }) {
		console.log(loginForm);
	}
	return (
		<div className="login-container">
			<div className="login-header">
				<h1 style={{ color: '#FFF455' }}>Hotels.com</h1>
			</div>
			<div className="custom-card-container">
				<Card title="Login" bordered>
					<LoginForm handleSubmit={handleSubmit} />
				</Card>
			</div>
			{width > 750 && <div className="login-background justify-center">
                    
                    <h2 style={{opacity: 0.77, background: '#EEEEEE', float: 'right', color: '#000', fontSize: '3.5rem', padding: '20px' }}>Let your journey start here</h2>
                    
            </div>}
		</div>
	);
}
