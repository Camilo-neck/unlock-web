import { Fetch } from '@/lib/fetch/client';
import { createClient } from '@/lib/supabase/client';
import { cn, formatDateString } from '@/lib/utils';
import { LogIn, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

export type LogType = {
	user_email: string;
	device_name: string;
	action: 'enter' | 'exit';
	access_at: string;
};

enum LogAction {
	enter='ha ingresado en',
	exit='ha salido por'
}

const Log = ({ user_email, device_name, action, access_at } : LogType) => {

	return (
		<div className='space-y-2'>
			<div className={cn('p-2 px-4 rounded-lg', 
				action === 'enter' ? 'bg-secondary/60 text-secondary-foreground' : 'bg-error/60 text-error-foreground'
			)}>
				<div className='flex gap-2 items-center'>
					{
						action === 'enter' ? (
							<LogIn size={16} />
						) : (
							<LogOut size={16} />
						)
					}
					<p>{user_email} { LogAction[action] } {device_name}</p>
				</div>
			</div>
			<p className='text-gray-400 text-xs'>{formatDateString(access_at)}</p>
		</div>
	);
}

const Logs = ({ event } : { event: string }) => {
	const supabase = createClient();

	useEffect(() => {
		console.log(`event_id=eq.${event}`)
		const channel = supabase.channel('access').on('postgres_changes', {
			event: '*',
			schema: 'public',
			table: 'access',
			filter: `event_id=eq.${event}`
		}, (payload) => {
			console.log(payload);
			refetch();
		}).subscribe();

		return (() => {
			supabase.removeChannel(channel);
		});
	}, [supabase, event]);

	const { data, refetch } = useQuery({
		queryKey: ['getEventLogs', event],
		queryFn: async () => {
			const response = await Fetch.getInstance().fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/access/event/${event}`);
			const data = await response.json();
			return data;
		},
		enabled: !!event,
		onSuccess(data) {
			console.log(data);
		},
	})
	return (
		<div className='flex flex-col gap-4 max-h-[80vh] overflow-y-auto'>
			{
				data?.map((log: LogType, index: number) => (
					<Log key={index} {...log} />
				))
			}
		</div>
	);
};

export default Logs;