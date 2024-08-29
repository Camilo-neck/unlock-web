import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
	title: "Login",
	description: "Login page",
};

const RegisterLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div>
			{children}
		</div>
	);
};

export default RegisterLayout;