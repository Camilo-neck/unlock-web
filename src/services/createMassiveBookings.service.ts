import { Fetch } from "@/lib/fetch/client";
import { CreateUser } from "@/schemas/user.schema";

export default async function createMassiveBookings(usersLoad: CreateUser, event_id: string): Promise<void> {
	const res = await Fetch.getInstance().fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/create_from_users/${event_id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(usersLoad),
	});
	const data = await res.json();
	return data;
}