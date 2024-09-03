'use client';

import useDashboardSidebars from '@/stores/useDashboardSidebars';
import Sidebar from './sidebar';
import LogsSidebar from './logsSidebar';
import { Event } from '@/schemas/event.schema';

const SidebarsWrapper = ({
	children,
	events
}: {
	children: React.ReactNode;
	events?: Event[];
}) => {
	const { open } = useDashboardSidebars();
	return (
		<>
			<Sidebar events={events} size={open !== 'left' ? 'sm' : 'default'} />
			{children}
			<LogsSidebar size={open === 'left' ? 'sm' : 'default'} />
		</>
	);
};

export default SidebarsWrapper;