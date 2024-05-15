import { z } from 'zod';

export const createVideosSchema = z
  .object({
    codigo: z.string(),
    referencia: z.string(),
    estado: z.number().int().positive(),
    nombre: z.string(),
    url: z.string().url(),
    grupos_id: z.number().int().positive(),
  })
  .required();

export type CreateVideosDto = z.infer<typeof createVideosSchema>;
