'use client';

import { Input } from '../ui/input';
import LoadUsersModal from './modals/LoadUsersModal';
import { Button } from '../ui/button';
import { Check, Logs, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { formatDateString } from '@/lib/utils';
import { Booking } from '@/schemas/booking.schema';
import useDashboardSidebars from '@/stores/useDashboardSidebars';
import { useState } from 'react';
import useBookings from '@/stores/useBookings';

const EventAssistants = ({
	eventId
}: {
	eventId: string;
}) => {
    const { toggleOpen } = useDashboardSidebars();
	const { bookings } = useBookings();
	const [searchFilter, setSearchFilter] = useState<string>('');

	const filterBookings = (booking: Booking, filter: string) => {
		return booking.user?.name?.toLowerCase().includes(filter.toLowerCase()) || booking.user.email.toLowerCase().includes(filter.toLowerCase());
	}


	return (
		<div className="bg-white rounded-lg shadow overflow-x-auto">
			<div className="flex items-center justify-between p-4 border-b">
				<h2 className="text-lg font-semibold">Todos los Asistentes</h2>
				<div className="flex items-center gap-4">
					<Input
						className="w-64"
						placeholder="Buscar"
						type="search"
						value={searchFilter}
						onChange={(e) => setSearchFilter(e.target.value)}
					/>
					<LoadUsersModal eventId={eventId} />
					<Button onClick={toggleOpen}>
						<div className="flex items-center gap-1">
							<Logs size={16} /> Logs
						</div>
					</Button>
				</div>
			</div>
			<div className="w-full min-w-[1024px]">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nombre del Asistente</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Número telefónico</TableHead>
							<TableHead>Dispositivo</TableHead>
							<TableHead>Alojamiento</TableHead>
							<TableHead>Fecha Ingreso</TableHead>
							<TableHead>Estado</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{bookings?.filter(booking => filterBookings(booking, searchFilter)).map((booking, index) => (
							<TableRow key={booking.id}>
								<TableCell className="font-medium">
									{booking.user.name || '-'}
								</TableCell>
								<TableCell>{booking.user.email}</TableCell>
								<TableCell>{booking.user.phone || '-'}</TableCell>
								<TableCell>{booking.device.name}</TableCell>
								<TableCell>
									{index % 3 === 0 ? (
										<Check
											className="text-secondary-foreground"
											size={16}
										/>
									) : (
										<X
											className="text-error-foreground"
											size={16}
										/>
									)}
								</TableCell>
								<TableCell>{ booking.booked_at ? formatDateString(booking.booked_at) : "-"}</TableCell>
								<TableCell>
									<span
										className={`px-2 py-1 rounded-sm text-xs ${
											booking.checked_in
												? "bg-secondary text-secondary-foreground border border-secondary-foreground"
												: "bg-error text-error-foreground border border-error-foreground"
										}`}
									>
										{booking.checked_in ? "Ingresado" : "Fuera"}
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{/* <div className="flex w-full items-center justify-between px-4 py-4 border-t">
				<div className="text-sm text-gray-500">
					Showing 8 out of 100 entries
				</div>
				<div className="flex space-x-2">
					<Button variant="outline" size="sm">
						Previous
					</Button>
					<Button variant="outline" size="sm">
						1
					</Button>
					<Button variant="outline" size="sm">
						2
					</Button>
					<Button variant="outline" size="sm">
						3
					</Button>
					<Button variant="outline" size="sm">
						Next
					</Button>
				</div>
			</div> */}
		</div>
	);
};

export default EventAssistants;