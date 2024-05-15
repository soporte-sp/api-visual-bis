/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserAdminDto, UpdateUserAdminDto } from './user-admin.dto';
import { Pool } from 'mysql2/promise';

@Injectable()
export class UserAdminService {
  [x: string]: any;
  constructor(
    @Inject('DATABASE_CONNECTION')
    private pool: Pool,
  ) {}

  async create(createUserAdminDto: CreateUserAdminDto) {
    console.log({ createUserAdminDto });

    try {
      const [userAdmin] = await this.pool.query(
        'INSERT INTO usuarios_admin SET ?',
        createUserAdminDto,
      );

      console.log({ userAdmin });

      return userAdmin;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  async findAll() {
    const [userAdmins] = await this.pool.query('SELECT * FROM usuarios_admin');
    console.log({ userAdmins });
    return userAdmins;
  }

  async findOne(id: number) {
    const [userAdmin] = await this.pool.query(
      'SELECT * FROM usuarios_admin WHERE id = ?',
      [id],
    );

    console.log({ userAdmin });

    if (!userAdmin[0]) {
      return null;
    }

    return userAdmin;
  }

  async update(id: number, updateUserAdminDto: UpdateUserAdminDto) {
    const index = await this.findOne(id);

    if (!index) {
      return 'User not found!';
    }

    const [userAdmin] = await this.pool.query(
      'UPDATE usuarios_admin SET ? WHERE id = ?',
      [updateUserAdminDto, id],
    );

    console.log({ userAdmin });

    return 'User updated successfully!';
  }

  async remove(id: number) {
    const index = await this.findOne(id);

    if (!index) {
      return 'User not found!';
    }

    const [userAdmin] = await this.pool.query(
      'UPDATE usuarios_admin SET estatus = 0 WHERE id = ?',
      [id],
    );

    console.log({ userAdmin });

    return 'User deleted successfully!';
  }
}
