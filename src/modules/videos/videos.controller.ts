/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideosDto, createVideosSchema } from './videos.dto';
import { ZodValidationPipe } from 'src/common/ZodValidationPipe';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createVideosSchema))
  async create(@Body() createVideosDto: CreateVideosDto) {
    return this.videosService.create(createVideosDto);
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideosDto: CreateVideosDto) {
    return this.videosService.update(+id, updateVideosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
