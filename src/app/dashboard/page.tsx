import Content from '@/components/ui/dashboard/content';
import Sidebar from '@/components/ui/dashboard/sidebar';
import SidebarsWrapper from '@/components/ui/dashboard/sidebarsWrapper';
import React from 'react';

const DashboardPage = () => {
	return (
		<div className='flex overflow-x-hidden'>
			<SidebarsWrapper>
				<div className='flex-1 p-20 overflow-x-auto'>.
					<Content />
				</div>
			</SidebarsWrapper>
		</div>
	);
};

export default DashboardPage;