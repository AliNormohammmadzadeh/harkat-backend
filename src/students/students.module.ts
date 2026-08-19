import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { ProfileService } from './profile.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, ProfileService],
  exports: [StudentsService],
})
export class StudentsModule {}
