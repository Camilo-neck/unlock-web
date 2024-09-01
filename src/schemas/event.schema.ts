import { z } from 'zod';

const EventSchema = z.object({
	id: z.string().uuid(),
	admin_id: z.string().uuid(),
	name: z.string(),
	description: z.string(),
	location: z.string(),
	capacity: z.number(),
	start_time: z.string(),
	end_time: z.string(),
	created_at: z.string(),
});

export type Event = z.infer<typeof EventSchema>;

export default EventSchema;