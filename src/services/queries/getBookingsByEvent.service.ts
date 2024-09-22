'use server';
import FetchFactory from "@/lib/fetch/fetch";
import { Booking } from "@/schemas/booking.schema";

export default async function getBookingsByEvent(eventId: string): Promise<Booking[]> {
  	return await FetchFactory.getFetchAdapter('server').getInstance().fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/event/${eventId}`).then(res => res.json());
}