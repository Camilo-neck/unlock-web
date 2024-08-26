import React from 'react';

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
					<div onClick={() => console.log(event.name)} key={event.name} className={`flex items-center text-gray-700 cursor-pointer justify-between rounded-md py-2 text-left text-sm font-medium hover:bg-gray-100 ${event.selected && '!bg-primary !text-white hover:!bg-primary'}`}>
						<div className="flex items-center space-x-3">
							<span className="text-xl">{event.icon}</span>
						</div>
					</div>
				))
			}
		</div>
	);
};

export default Options;