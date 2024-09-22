import { Fetch } from "@/lib/fetch/client";

interface CreateDevicePayloadI {
	name: string;
	event_id: string;
	status: string;
}

export default async function createDevice(payload: CreateDevicePayloadI): Promise<Event> {
	const res = await Fetch.getInstance().fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/devices/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	}).then((res) => {
		if (!res.ok) {
			throw new Error('Error creating device');
		}
		return res;
	});
	const data = await res.json();
	return data;
}