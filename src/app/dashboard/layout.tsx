import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Dashboard page",
};

const DashboardLayout = ({
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

export default DashboardLayout;