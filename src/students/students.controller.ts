import { Controller, Get, Inject, Param } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from '../student/student.entity';

@Controller('students')
export class StudentsController {
  constructor(
    @Inject(StudentsService) private studentsService: StudentsService,
  ) {}
  @Get('/available-students')
  async getAvailableStudents(): Promise<Student[]> {
    return await this.studentsService.getAvailableStudents();
  }
  @Get('/awaiting-students')
  async getAwaitingStudents(): Promise<Student[]> {
    return await this.studentsService.getAwaitingStudents();
  }
  @Get('/hired-students')
  async getHiredStudents(): Promise<Student[]> {
    return await this.studentsService.getHiredStudents();
  }
  @Get('/available-students/:id')
  async getOneAvailableStudent(@Param('id') id: string): Promise<Student> {
    return this.studentsService.getOneAvailableStudents(id);
  }
}
