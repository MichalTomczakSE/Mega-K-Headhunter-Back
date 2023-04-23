import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  async getStudents(status: number): Promise<Student[]> {
    return await Student.find({
      where: {
        status,
      },
    });
  }
  async getOneAvailableStudents(id: string): Promise<Student> {
    return await Student.findOne({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        expectedTypeWork: true,
        targetWorkCity: true,
        expectedSalary: true,
        canTakeApprenticeship: true,
        workExperience: true,
      },
      relations: {
        degrees: {},
      },
      where: {
        status: 1,
        id,
      },
    });
  }
}
