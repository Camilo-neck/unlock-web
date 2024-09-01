import React, { useCallback } from 'react';
import { Button } from '../../button';
import { Event } from '@/schemas/event.schema';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface OptionsProps {
	events?: Event[];
}

const icons = [
  "👥",
  "🏖️",
  "🔍",
  "🎭",
]

const Options = ({
	events
}: OptionsProps) => {
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set(name, value)
	
		return params.toString()
		},
		[searchParams]
	)

	const handleEventClick = useCallback(
		(eventId: string) => {
		const queryString = createQueryString("event", eventId)
		router.push(`${pathname}?${queryString}`)
		},
		[createQueryString, pathname, router]
	)
	return (
		<div>
			{
				events?.map((event, index) => (
					<Button variant='ghost' onClick={() => handleEventClick(event.id)} key={event.name} className={cn(
						'p-0 flex items-center text-gray-700 cursor-pointer justify-between rounded-md py-2 text-left text-sm font-medium hover:bg-gray-100',
						event.id === searchParams.get('event') && '!bg-primary !text-white hover:!bg-primary'
					)}>
						<div className="flex items-center space-x-3">
							<span className="text-xl">{icons[index % icons.length]}</span>
						</div>
					</Button>
				))
			}
		</div>
	);
};

export default Options;