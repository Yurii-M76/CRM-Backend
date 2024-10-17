import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from '@user/user.module';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { AuthModule } from '@auth/auth.module';
import { VolunteersModule } from 'src/volunteers/volunteers.module';
import { AllExceptionsFilter } from 'src/exception-filters/exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    VolunteersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
