import { z } from 'zod';

export const DeviceSchema = z.object({
  id: z.string().uuid(),
  event_id: z.string().uuid(),
  name: z.string(),
  status: z.string(),
  created_at: z.string(),
});

export type Device = z.infer<typeof DeviceSchema>;