'use client'

import { Booking } from '@/schemas/booking.schema';
import useBookings from '@/stores/useBookings';
import { MonitorSmartphone, UserCircle2 } from 'lucide-react';
import React from 'react';

const EventStats = () => {
	const { bookings } = useBookings();
	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="flex items-center space-x-4 bg-green-50 rounded-lg p-4">
				<UserCircle2 className="h-8 w-8 text-green-500" />
				<div>
					<div className="text-2xl font-bold">{bookings.length}</div>
					<div className="text-sm text-gray-500">Asistentes</div>
				</div>
			</div>
			
			<div className="flex items-center space-x-4 bg-blue-50 rounded-lg p-4">
				<MonitorSmartphone className="h-8 w-8 text-blue-500" />
				<div>
					<div className="text-2xl font-bold">{ bookings.reduce((prev, curr) => prev + (curr.checked_in ? 1 : 0), 0) }</div>
					<div className="text-sm text-gray-500">Ingresados</div>
				</div>
			</div>
		</div>
	);
};

export default EventStats;