export class UserAdmin {
  id: number;
  identificacion: string;
  nombre_usuario: string;
  email: string;
  clave: string;
  codigo_verificacion_email: string;
  codigo_verificacion_password: string;
  verificado: number;
  status: number;
  img_firma: string;
  cliente_id: number;
  rol_id: number;
}
