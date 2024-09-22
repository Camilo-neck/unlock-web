import { formatDateString } from '@/lib/utils';
import { Users } from 'lucide-react';
import React from 'react';

interface EventInformationProps {
	description: string;
	name: string;
	location: string;
	start_time?: string;
	end_time?: string;
	capacity: number;
}

const EventInformation = ({
	description,
	name,
	location,
	start_time,
	end_time,
	capacity,
}: EventInformationProps) => {
	return (
		<div className="flex items-center flex-wrap lg:flex-nowrap justify-between space-x-4 space-y-2 bg-purple-50 rounded-lg p-4">
			<Users className="h-8 w-8 text-purple-500" />
			<div className="max-w-sm text-wrap break-words">
				<p className="text-gray-500">{ description }</p>
			</div>
			<div>
				<div className="text-2xl font-bold">{ name }</div>
				<div className="text-sm text-gray-500">{ location }</div>
			</div>
			<div>
				<p className="font-bold">Fecha de Inicio: <span className="font-normal text-gray-600">{ start_time && formatDateString(start_time) }</span></p>
				<p className="font-bold">Fecha de Finalización: <span className="font-normal text-gray-600">{ end_time && formatDateString(end_time) }</span></p>
			</div>
			<div className="flex flex-col items-center">
				<p className="font-bold">Cupos</p>
				<p className="text-gray-600 text-2xl">{capacity}</p>
			</div>
		</div>
	);
};

export default EventInformation;