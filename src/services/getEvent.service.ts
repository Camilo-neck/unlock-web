import FetchFactory from "@/lib/fetch/fetch";
import { Event } from "@/schemas/event.schema";

export default async function getEvent(eventId: string): Promise<Event> {
	'use server';
	return await FetchFactory.getFetchAdapter('server').getInstance().fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${eventId}`).then(res => res.json());
}