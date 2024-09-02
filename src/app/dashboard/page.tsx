import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Content from '@/components/ui/dashboard/content';
import SidebarsWrapper from '@/components/ui/dashboard/sidebarsWrapper';
import { createClient } from '@/lib/supabase/server';
import getEvent from '@/services/getEvent.service';
import getAdminEvents from '@/services/getAdminEvents.service';
import getBookingsByEvent from '@/services/getBookingsByEvent.service';

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
	const supabase = createClient();
	const { event } = searchParams;

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}
	const adminEvents = await getAdminEvents();

	if (event) {
		const eventData = await getEvent(event as string);
		const eventBookings = await getBookingsByEvent(event as string);
		return (
			<div className='flex overflow-x-hidden'>
				<SidebarsWrapper events={adminEvents}>
					<div className='flex-1 p-20 overflow-x-auto'>
						<Content eventData={eventData} bookings={eventBookings} />
					</div>
				</SidebarsWrapper>
			</div>
		)
	}

	return (
		<div className='flex overflow-x-hidden'>
			<SidebarsWrapper events={adminEvents}>
				<div className='flex-1 p-20 overflow-x-auto'>
					<div className='text-4xl font-bold'>Welcome to Unlock!</div>
				</div>
			</SidebarsWrapper>
		</div>
	);
};

export default DashboardPage;