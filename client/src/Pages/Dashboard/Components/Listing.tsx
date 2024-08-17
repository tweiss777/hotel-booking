import './styles.scss';
import { Flex, Card, Button } from 'antd';
import { useNavigate } from 'react-router';
interface IProps {
	id: string;
	name: string;
	address: string;
	rating: number;
	img?: string;
}

export default function Listing(props: IProps) {
	const navigate = useNavigate();
	return (
		<Card>
			<Flex wrap justify="space-between" vertical={false}>
				<Flex wrap gap={20}>
					<Flex>
						<img
							className="hotel-img"
							src={props?.img ?? 'https://img.freepik.com/free-photo/tall-building-with-pure-white-isolated_181624-178.jpg?w=2000&t=st=1723859744~exp=1723860344~hmac=ab52adb2d9c1365c16d1bba08dcf653b8db370c6c8ecec1a68181fa8a863e7d0'}
						/>
					</Flex>
					<Flex vertical justify="center">
						<h1>{props.name}</h1>
						<h2>{props.address}</h2>
						<h3> Rating: {props.rating}</h3>
					</Flex>
				</Flex>
				<Flex vertical justify="end">
					<Button
						onClick={() => navigate(`/hotel/${props.id}`)}
						size="large"
						type="primary"
					>
						Book Now
					</Button>
				</Flex>
			</Flex>
		</Card>
	);
}
