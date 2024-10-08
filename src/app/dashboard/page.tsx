import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Content from '@/components/dashboard/content';
import SidebarsWrapper from '@/components/dashboard/sidebarsWrapper';
import { createClient } from '@/lib/supabase/server';
import getEvent from '@/services/queries/getEvent.service';
import getAdminEvents from '@/services/queries/getAdminEvents.service';
import getBookingsByEvent from '@/services/queries/getBookingsByEvent.service';
import { Skeleton } from '@/components/ui/skeleton';

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
		return (
			<div className='flex overflow-x-hidden'>
				<SidebarsWrapper events={adminEvents}>
					<div className='flex-1 p-20 overflow-x-auto'>
						<Suspense fallback={<Skeleton className='h-12 w-12 rounded-full' />}>
							<Content event={event as string} />
						</Suspense>
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