import React from 'react';
import { Button } from '../../button';

const childEvents = [
  { icon: "👥", name: "BigParty", selected: true },
  { icon: "🏖️", name: "SummerParty" },
  { icon: "🔍", name: "Google I/O" },
  { icon: "🎭", name: "GoFest" },
]

const Options = () => {
	return (
		<div>
			{
				childEvents.map((event) => (
					<Button variant='ghost' onClick={() => console.log(event.name)} key={event.name} className={`p-0 flex items-center text-gray-700 cursor-pointer justify-between rounded-md py-2 text-left text-sm font-medium hover:bg-gray-100 ${event.selected && '!bg-primary !text-white hover:!bg-primary'}`}>
						<div className="flex items-center space-x-3">
							<span className="text-xl">{event.icon}</span>
						</div>
					</Button>
				))
			}
		</div>
	);
};

export default Options;