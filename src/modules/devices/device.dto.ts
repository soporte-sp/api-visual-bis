/* eslint-disable @typescript-eslint/no-unused-vars */
import * as moment from 'moment-timezone';
import { z } from 'zod';

export const createDeviceSchema = z
  .object({
    referencia: z.string(),
    estado: z.number(),
    password: z.string(),
    sincronizar: z.number(),
    codigo: z.string(),
    id_cliente: z.number(),
    grupos_id: z.number(),
  })
  .required();

export const updateDateSchema = z.object({
  /* fecha: z.custom(
    (value) => {
      const syncDate = moment.tz(`${value}`, 'America/Bogota');
      if (syncDate.isValid()) {
        return { value };
      }
    },
    { message: 'Fecha no válida' },
  ), */
  fecha: z.string(),
});

export type CreateDeviceDto = z.infer<typeof createDeviceSchema>;
export type UpdateDateDto = z.infer<typeof updateDateSchema>;
