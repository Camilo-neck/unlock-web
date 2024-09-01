import { Event } from "@/schemas/event.schema";

export default function getEvent(token: string, eventId: string): Promise<Event> {
	return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${eventId}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then(res => res.json());
}