import { Injectable } from '@nestjs/common';
import { Student } from '../student/student.entity';

@Injectable()
export class StudentsService {
  async getStudents(status: number): Promise<Student[]> {
    return await Student.find({
      where: {
        status,
      },
    });
  }
  async getOneAvailableStudents(id: string): Promise<Student> {
    return await Student.findOne({
      where: {
        status: 1,
        id,
      },
    });
  }
}
