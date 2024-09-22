import { Fetch } from "@/lib/fetch/client";
import { Event } from "@/schemas/event.schema";
import { CreateEventSchema } from "@/schemas/event.schema";
import { z } from "zod";

export default async function createEvent(event: z.infer<typeof CreateEventSchema>): Promise<Event> {
	const res = await Fetch.getInstance().fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(event),
	}).then((res) => {
		if (!res.ok) {
			throw new Error('Error creating event');
		}
		return res;
	});
	const data = await res.json();
	return data;
}