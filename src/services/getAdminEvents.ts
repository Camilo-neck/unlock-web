import { Event } from "@/schemas/event.schema";

export default async function getAdminEvents(token: string): Promise<Event[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/admin`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	const data = await res.json();
	return data;
}