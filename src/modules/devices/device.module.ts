import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
