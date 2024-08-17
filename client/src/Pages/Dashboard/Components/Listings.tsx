interface IProps {
    children: JSX.Element | JSX.Element[];
}

export default function Listings({ children }: IProps) {
    return <div className='listings'>{children}</div>;
}
