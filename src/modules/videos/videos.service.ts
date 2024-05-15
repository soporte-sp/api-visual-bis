/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateVideosDto } from './videos.dto';
import { Pool } from 'mysql2/promise';

@Injectable()
export class VideosService {
  [x: string]: any;
  constructor(
    @Inject('DATABASE_CONNECTION')
    private pool: Pool,
  ) {}

  async create(createVideosDto: CreateVideosDto) {
    console.log({ createVideosDto });

    try {
      const [video] = await this.pool.query(
        'INSERT INTO videos SET ?',
        createVideosDto,
      );

      console.log({ video });

      return video;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  async findAll() {
    const [videos] = await this.pool.query('SELECT * FROM videos');
    console.log({ videos });
    return videos;
  }

  async findOne(id: number) {
    const [video] = await this.pool.query('SELECT * FROM videos WHERE id = ?', [
      id,
    ]);

    console.log({ video });

    if (!video[0]) {
      return null;
    }

    return video;
  }

  async update(id: number, updateVideosDto: CreateVideosDto) {
    const index = await this.findOne(id);

    if (!index) {
      return 'Video not found!';
    }

    const [video] = await this.pool.query('UPDATE videos SET ? WHERE id = ?', [
      updateVideosDto,
      id,
    ]);

    console.log({ video });

    return 'Video updated successfully!';
  }

  async remove(id: number) {
    const index = await this.findOne(id);

    if (!index) {
      return 'Video not found!';
    }

    const [video] = await this.pool.query(
      'UPDATE videos SET estado = 0 WHERE id = ?',
      [id],
    );

    console.log({ video });

    return 'Video deleted successfully!';
  }
}
