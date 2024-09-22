'use server';
import FetchFactory from "@/lib/fetch/fetch";
import { Device } from "@/schemas/device.schema";

export default async function getEventDevices(eventId: string): Promise<Device[]> {
	return await FetchFactory.getFetchAdapter('server').getInstance().fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/devices/event/${eventId}`).then(res => res.json());
}