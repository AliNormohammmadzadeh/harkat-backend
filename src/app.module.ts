import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { ProgramsModule } from './programs/programs.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { LookupsModule } from './lookups/lookups.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    StudentsModule,
    ProgramsModule,
    AnalyticsModule,
    LookupsModule,
  ],
})
export class AppModule {}
