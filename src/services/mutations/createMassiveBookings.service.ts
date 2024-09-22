import { Fetch } from "@/lib/fetch/client";
import { Booking } from "@/schemas/booking.schema";
import { CreateUser } from "@/schemas/user.schema";

export default async function createMassiveBookings(usersLoad: CreateUser, event_id: string): Promise<Booking[]> {
	const res = await Fetch.getInstance().fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/create_from_users/${event_id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(usersLoad),
	}).then((res) => {
		if (!res.ok) {
			throw new Error('Error creating bookings');
		}
		return res;
	});
	const data = await res.json();
	return data;
}