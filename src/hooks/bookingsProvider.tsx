'use client';

import { Booking } from "@/schemas/booking.schema";
import useBookings from "@/stores/useBookings";
import { useEffect } from "react";

const BookingsProvider = ({
	initialBookings,
	children,
}: {
	initialBookings: Booking[];
	children: React.ReactNode;
}) => {
	const { setBookings } = useBookings();

	useEffect(() => {
		setBookings(initialBookings);
	}, [initialBookings]);
	
	return (
		<>
			{children}
		</>
	);
};

export default BookingsProvider;