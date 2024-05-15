/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';
import * as bcrypt from 'bcrypt';

export class UpdateUserAdminDto {}

const encriptedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const createUserAdminSchema = z
  .object({
    identificacion: z.string(),
    nombre_usuario: z.string(),
    email: z.string().email(),
    clave: z.string().transform(encriptedPassword),
    cliente_id: z.number().int().positive(),
    rol_id: z.number().int().positive(),
  })
  .required();

export type CreateUserAdminDto = z.infer<typeof createUserAdminSchema>;
