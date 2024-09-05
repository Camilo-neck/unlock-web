import { z } from 'zod';
import EventSchema from './event.schema';
import { UserSchema } from './user.schema';
import { DeviceSchema } from './device.schema';

export const BookingSchema = z.object({
	id: z.string().uuid(),
	event: EventSchema,
	user: UserSchema,
	device: DeviceSchema,
	checked_in: z.boolean(),
	booked_at: z.string().optional(),
	created_at: z.string(),
});

export type Booking = z.infer<typeof BookingSchema>;