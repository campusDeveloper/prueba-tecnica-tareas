import { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';

type Props = { children?: ReactNode };

export const PrivateRoute = ({ children }: Props) => {
	let token = localStorage.getItem('token')
	if(token){
		token = JSON.stringify(token)
	}
	if (!token) return <Redirect to="/login" />;
	return <>{children}</>;
};