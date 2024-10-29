'use client';

import useDashboardSidebars from '@/stores/useDashboardSidebars';
import Sidebar from './sidebar';
import LogsSidebar from './logsSidebar';
import { Event } from '@/schemas/event.schema';

const SidebarsWrapper = ({
	event,
	children,
	events
}: {
	event: string;
	children: React.ReactNode;
	events?: Event[];
}) => {
	const { open } = useDashboardSidebars();
	return (
		<>
			<Sidebar initialEvents={events} size={open !== 'left' ? 'sm' : 'default'} />
			{children}
			<LogsSidebar event={event} size={open === 'left' ? 'sm' : 'default'} />
		</>
	);
};

export default SidebarsWrapper;