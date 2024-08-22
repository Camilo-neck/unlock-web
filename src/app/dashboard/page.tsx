import Content from '@/components/ui/dashboard/content';
import Sidebar from '@/components/ui/dashboard/sidebar';
import React from 'react';

const DashboardPage = () => {
	return (
		<div className='flex'>
			<Sidebar />
			<div className='flex-1 p-20'>.
				<Content />
			</div>
		</div>
	);
};

export default DashboardPage;