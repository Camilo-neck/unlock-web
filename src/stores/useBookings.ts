import { Booking } from '@/schemas/booking.schema';
import { create } from 'zustand';

export type Bookings = {
	bookings: Booking[];
	setBookings: (bookings: Booking[]) => void;
	appendBookings: (newBookings: Booking[]) => void;
}

const useBookings = create<Bookings>((set) => ({
	bookings: [],
	setBookings: (bookings) => set({ bookings: bookings }),
	appendBookings: (newBookings) => set((state) => ({ bookings: [...state.bookings, ...newBookings] })),
}));

export default useBookings;