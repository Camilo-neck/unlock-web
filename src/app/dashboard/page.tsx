import React from 'react';
import { redirect } from 'next/navigation';
import Content from '@/components/ui/dashboard/content';
import SidebarsWrapper from '@/components/ui/dashboard/sidebarsWrapper';
import { createClient } from '@/lib/supabase/server';

const fetchUser = async (token: string) => {
	console.log(token)
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`, {
		headers: {
			"Authorization": `Bearer ${token}`,
		},
	});

	return response.json();
}

const DashboardPage = async () => {
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	return (
		<div className='flex overflow-x-hidden'>
			<SidebarsWrapper>
				<div className='flex-1 p-20 overflow-x-auto'>
					<Content />
				</div>
			</SidebarsWrapper>
		</div>
	);
};

export default DashboardPage;