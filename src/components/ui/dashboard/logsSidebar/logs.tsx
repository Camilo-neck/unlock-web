import { cn } from '@/lib/utils';
import { LogIn, LogOut } from 'lucide-react';
import React from 'react';

export type LogType = {
	user: string;
	device: string;
	action: 'Checked-in' | 'Checked-out';
};

const logs: LogType[] = [
	{
		user: 'John Doe',
		device: 'BM236',
		action: 'Checked-in',
	},
	{
		user: 'Jane Doe',
		device: 'LA874',
		action: 'Checked-in',
	},
	{
		user: 'John Doe',
		device: 'BM236',
		action: 'Checked-out',
	},
	{
		user: 'John Doe',
		device: 'BM236',
		action: 'Checked-in',
	},
	{
		user: 'John Doe',
		device: 'BM236',
		action: 'Checked-out',
	},
]

const Log = ({ user, device, action } : LogType) => {
	return (
		<div className={cn('p-2 px-4 rounded-lg', 
			action === 'Checked-in' ? 'bg-secondary/60 text-secondary-foreground' : 'bg-error/60 text-error-foreground'
		)}>
			<div className='flex gap-2 items-center'>
				{
					action === 'Checked-in' ? (
						<LogIn size={16} />
					) : (
						<LogOut size={16} />
					)
				}
				<p>{user} ha { action === 'Checked-in' ? 'ingresado en ' : 'salido de ' }{device}</p>
			</div>
		</div>
	);
}

const Logs = () => {
	return (
		<div className='flex flex-col gap-4'>
			{
				logs.map((log, index) => (
					<Log key={index} {...log} />
				))
			}
		</div>
	);
};

export default Logs;