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
import { GroupsService } from './groups.service';
import { CreateGroupsDto, createGroupsSchema } from './groups.dto';
import { ZodValidationPipe } from 'src/common/ZodValidationPipe';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createGroupsSchema))
  async create(@Body() createGroupsDto: CreateGroupsDto) {
    return this.groupsService.create(createGroupsDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Get('video/:code/:password')
  findByCode(@Param('code') code: string, @Param('password') password: string) {
    return this.groupsService.findByCode(code, password);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupsDto: CreateGroupsDto) {
    return this.groupsService.update(+id, updateGroupsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
