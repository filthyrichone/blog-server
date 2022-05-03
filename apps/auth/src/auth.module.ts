import { DbModule } from '@db/db';
import { CacheModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { LogoutModule } from './logout/logout.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    // LoginModule,
    DbModule,
    RegisterModule,
    LogoutModule,
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (confService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: confService.get('REDIS_HOST'),
        port: confService.get('REDIDS_PORT'),
        ttl: confService.get('CACHE_TTL'),
      }),
    }),
  ],
  exports: [CacheModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
