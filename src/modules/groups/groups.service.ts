/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateGroupsDto } from './groups.dto';
import { Pool } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GroupsService {
  [x: string]: any;
  constructor(
    @Inject('DATABASE_CONNECTION')
    private pool: Pool,
  ) {}

  async encriptedPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(createGroupsDto: CreateGroupsDto) {
    console.log({ createGroupsDto });

    try {
      const [group] = await this.pool.query(
        'INSERT INTO grupos SET ?',
        createGroupsDto,
      );

      console.log({ group });

      return group;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  async findAll() {
    const [groups] = await this.pool.query('SELECT * FROM grupos');
    console.log({ groups });
    return groups;
  }

  async findOne(id: number) {
    const [group] = await this.pool.query('SELECT * FROM grupos WHERE id = ?', [
      id,
    ]);

    console.log({ group });

    if (!group[0]) {
      return null;
    }

    return group;
  }

  async findByCode(code: string, password: string) {
    console.log(password);

    const encriptedPassword = await this.encriptedPassword(password);

    const validPassword = await bcrypt.compare(password, encriptedPassword);

    console.log(validPassword);

    if (!validPassword) {
      return 'Invalid password!';
    }

    const [video] = await this.pool.query(
      'SELECT v.* FROM dispositivo AS d INNER JOIN videos_has_grupos AS vd INNER JOIN videos AS v WHERE vd.grupos_id = d.grupos_id AND v.id = vd.videos_id AND d.codigo = ?',
      [code],
    );

    console.log([video]);

    if (!video[0]) {
      return null;
    }

    return video;
  }

  async update(id: number, updateGroupsDto: CreateGroupsDto) {
    const index = await this.findOne(id);

    if (!index) {
      return 'Group not found!';
    }

    const [group] = await this.pool.query('UPDATE grupos SET ? WHERE id = ?', [
      updateGroupsDto,
      id,
    ]);

    console.log({ group });

    return 'Group updated successfully!';
  }

  async remove(id: number) {
    const index = await this.findOne(id);

    if (!index) {
      return 'Group not found!';
    }

    const [group] = await this.pool.query(
      'UPDATE grupos SET Estado = 0 WHERE id = ?',
      [id],
    );

    console.log({ group });

    return 'Group deleted successfully!';
  }
}
