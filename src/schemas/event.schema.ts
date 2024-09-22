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

export const CreateEventSchema = z.object({
	name: z.string({
		required_error: 'El nombre es requerido',
	}),
	description: z.string({
		required_error: 'La descripción es requerida',
	}),
	location: z.string({
		required_error: 'La ubicación es requerida',
	}),
	capacity: z.number({
		required_error: 'La capacidad es requerida',
		invalid_type_error: 'La capacidad debe ser un número',
	}),
	start_time: z.string({
		required_error: 'La hora de inicio es requerida',
	}),
	end_time: z.string({
		message: 'La hora de finalización es requerida',
	}),
});

export type Event = z.infer<typeof EventSchema>;

export default EventSchema;