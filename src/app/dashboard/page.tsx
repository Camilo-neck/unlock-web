import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Content from '@/components/ui/dashboard/content';
import SidebarsWrapper from '@/components/ui/dashboard/sidebarsWrapper';
import { createClient } from '@/lib/supabase/server';

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

	return (
		<div className='flex overflow-x-hidden'>
			<SidebarsWrapper>
				<div className='flex-1 p-20 overflow-x-auto'>
					{
						event ? <Content /> : <div className='text-4xl font-bold'>Welcome to Unlock!</div>
					}
				</div>
			</SidebarsWrapper>
		</div>
	);
};

export default DashboardPage;