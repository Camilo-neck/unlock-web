'use server';
import FetchFactory from "@/lib/fetch/fetch";
import { Event } from "@/schemas/event.schema";

export default async function getAdminEvents(): Promise<Event[]> {
	const res = await FetchFactory.getFetchAdapter('server').getInstance().fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/admin`);
	const data = await res.json();
	return data;
}	