import Listing from './Components/Listing';
import Listings from './Components/Listings';

export default function Dashboard() {
	return (
		<div>
			<Listings>
				<Listing
					id="123"
					img={
						'https://cf.bstatic.com/xdata/images/hotel/max1280x900/367842551.jpg?k=1c1535d39af163b4896553e313c11603fb41faa75f5d1e1798277fca641f49c3&o=&hp=1'
					}
					name="waldof astoria"
					address="123 sesame st"
					rating={22}
				/>
				<Listing
					id="456'./placeholder.png'"
					name="hilton waldorf"
					address="f"
					rating={22}
				/>
			</Listings>
		</div>
	);
}
