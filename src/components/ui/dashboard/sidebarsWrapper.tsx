'use client';

import useDashboardSidebars from '@/stores/useDashboardSidebars';
import Sidebar from './sidebar';
import LogsSidebar from './logsSidebar';

const SidebarsWrapper = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const { open } = useDashboardSidebars();
	return (
		<>
			<Sidebar size={open !== 'left' ? 'sm' : 'default'} />
			{children}
			<LogsSidebar size={open === 'left' ? 'sm' : 'default'} />
		</>
	);
};

export default SidebarsWrapper;