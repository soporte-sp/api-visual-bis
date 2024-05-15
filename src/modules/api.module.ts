import { Module } from '@nestjs/common';
import { UserAdminModule } from './user-admin/user-admin.module';
import { DeviceModule } from './devices/device.module';
import { VideosModule } from './videos/videos.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [UserAdminModule, DeviceModule, VideosModule, GroupsModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
