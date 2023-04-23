import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Student } from './student.entity';
import { StudentStatus } from '../types';
import { StudentService } from './student.service';

@Controller('/students')
export class StudentController {
  constructor(
    @Inject(StudentService) private studentsService: StudentService,
  ) {}
  @Get('/available-students')
  async getAvailableStudents(): Promise<Student[]> {
    return await this.studentsService.getStudents(StudentStatus.available);
  }
  @Get('/awaiting-students')
  async getAwaitingStudents(): Promise<Student[]> {
    return await this.studentsService.getStudents(StudentStatus.awaiting);
  }
  @Get('/hired-students')
  async getHiredStudents(): Promise<Student[]> {
    return await this.studentsService.getStudents(StudentStatus.hired);
  }
  @Get('/available-students/:id')
  async getOneAvailableStudent(@Param('id') id: string): Promise<Student> {
    return this.studentsService.getOneAvailableStudents(id);
  }
}
