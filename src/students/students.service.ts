import { Injectable } from '@nestjs/common';
import { Student } from '../student/student.entity';

@Injectable()
export class StudentsService {
  async getAvailableStudents(): Promise<Student[]> {
    return await Student.find({
      where: {
        status: 1,
      },
    });
  }
  async getAwaitingStudents(): Promise<Student[]> {
    return await Student.find({
      where: {
        status: 2,
      },
    });
  }
  async getHiredStudents(): Promise<Student[]> {
    return await Student.find({
      where: {
        status: 3,
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
