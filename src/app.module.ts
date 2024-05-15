import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api.module';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ApiModule,
    DatabaseModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
