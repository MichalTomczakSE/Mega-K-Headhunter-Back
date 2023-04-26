import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { OneStudentResponse } from "../types";

@Injectable()
export class StudentService {
  async getStudents(status: number): Promise<Omit<OneStudentResponse, 'degrees'>[]> {
    return await Student.find({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        expectedTypeWork: true,
        targetWorkCity: true,
        expectedSalary: true,
        canTakeApprenticeship: true,
        workExperience: true,
      },where: {
        status,
      },
    });
  }
  async getOneAvailableStudents(id: string): Promise<OneStudentResponse>{
    return await Student.findOne({
      select: {
        githubUsername: true,
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
