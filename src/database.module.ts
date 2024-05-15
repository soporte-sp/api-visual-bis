import { Module } from '@nestjs/common';
import { createPool } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

const DBProvider = {
  provide: 'DATABASE_CONNECTION',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const poolConection = {
      host: configService.get<string>('database.host'),
      user: configService.get<string>('database.user'),
      password: configService.get<string>('database.password'),
      database: configService.get<string>('database.name'),
      port: parseInt(configService.get<string>('database.port')),
    };
    return createPool(poolConection);
  },
};

@Module({
  imports: [],
  providers: [DBProvider],
  exports: [DBProvider],
})
export class DatabaseModule {}
