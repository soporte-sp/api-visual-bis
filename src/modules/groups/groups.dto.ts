import { z } from 'zod';

export const createGroupsSchema = z
  .object({
    nombre: z.string(),
    estado: z.number().int().positive(),
    codigo: z.string(),
    idCliente: z.number().int().positive(),
  })
  .required();

export type CreateGroupsDto = z.infer<typeof createGroupsSchema>;
