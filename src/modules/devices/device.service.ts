import { Inject, Injectable } from '@nestjs/common';
import { CreateDeviceDto, createDeviceSchema } from './device.dto';
import { Pool } from 'mysql2/promise';
import * as moment from 'moment-timezone';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DeviceService {
  [x: string]: any;
  constructor(
    @Inject('DATABASE_CONNECTION')
    private pool: Pool,
  ) {}

  async encriptedPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(createDeviceDto: CreateDeviceDto) {
    console.log({ createDeviceDto });

    try {
      const deviceValues = createDeviceSchema.parse(createDeviceDto);
      const [device] = await this.pool.query(
        'INSERT INTO dispositivo SET ?',
        deviceValues,
      );

      return device;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  async findAll() {
    try {
      const [devices] = await this.pool.query(
        'SELECT dispositivo.* FROM dispositivo',
      );
      console.log({ devices });
      return devices;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    const [device] = await this.pool.query(
      'SELECT * FROM dispositivo WHERE id = ?',
      [id],
    );

    console.log({ device });

    if (!device[0]) {
      return null;
    }

    return device;
  }

  async findByCode(code: string, password: string) {
    const encriptedPassword = await this.encriptedPassword(password);

    const validPassword = await bcrypt.compare(password, encriptedPassword);

    if (!validPassword) {
      return 'Invalid password!';
    }

    const [video] = await this.pool.query(
      'SELECT v.* FROM dispositivo AS d INNER JOIN videos_has_grupos AS vd INNER JOIN videos AS v WHERE vd.grupos_id = d.grupos_id AND v.id = vd.videos_id AND d.codigo = ?',
      [code],
    );

    if (!video[0]) {
      return null;
    }

    return video;
  }

  async update(id: number, createDeviceDto: CreateDeviceDto) {
    const index = await this.findOne(id);

    const { password } = createDeviceDto;

    if (password) {
      const encriptedPassword = await this.encriptedPassword(password);
      createDeviceDto.password = encriptedPassword;
    }

    const newDeviceDto = {
      ...createDeviceDto,
      password: this.encriptedPassword,
    };

    console.log(newDeviceDto);

    if (!index) {
      return 'Device not found!';
    }

    const [device] = await this.pool.query(
      'UPDATE dispositivo SET ? WHERE id = ?',
      [createDeviceDto, id],
    );

    console.log({ device });

    return 'Device updated successfully!';
  }

  async updateDate(code: string, date: string) {
    const syncDate = moment
      .tz(date, 'America/Bogota')
      .format('YYYY-MM-DD HH:mm:ss');

    const [device] = await this.pool.query(
      'UPDATE dispositivo SET fecha_hora_validacion = ? WHERE codigo = ?',
      [syncDate, code],
    );
    console.log(device);

    return { response: 'Fecha y hora actualizada' };
  }

  async remove(id: number) {
    const index = await this.findOne(id);

    if (!index) {
      return 'Device not found!';
    }

    const [device] = await this.pool.query(
      'UPDATE dispositivo SET estado = 0 WHERE id = ?',
      [id],
    );

    console.log({ device });

    return 'Device deleted successfully!';
  }
}
