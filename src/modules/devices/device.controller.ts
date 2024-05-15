import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import {
  CreateDeviceDto,
  UpdateDateDto,
  createDeviceSchema,
  /* updateDateSchema, */
} from './device.dto';
import { ZodValidationPipe } from 'src/common/ZodValidationPipe';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createDeviceSchema))
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  findAll() {
    return this.deviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }

  @Get(':code/:password')
  findByCode(@Param('code') code: string, @Param('password') password: string) {
    return this.deviceService.findByCode(code, password);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.update(+id, createDeviceDto);
  }

  @Patch('date/:code')
  updateDate(
    @Param('code') code: string,
    @Body() updateDateDto: UpdateDateDto,
  ) {
    try {
      const { fecha } = updateDateDto;
      return this.deviceService.updateDate(code, fecha);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
