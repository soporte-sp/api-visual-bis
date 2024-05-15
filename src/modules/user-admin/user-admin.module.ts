import { Module } from '@nestjs/common';
import { UserAdminService } from './user-admin.service';
import { UserAdminController } from './user-admin.controller';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserAdminController],
  providers: [UserAdminService],
})
export class UserAdminModule {}
