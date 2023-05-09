import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { EmailModule } from "../email/email.module";

@Module({
  imports: [EmailModule],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
