import { BadRequestException, Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { GetSingleStudentFullDetailsResponse, OneStudentResponse, StudentStatus, } from '../types';
import { UpdateStudentDetailsDto } from './dto/update-student-details.dto';
import { StudentDegrees } from './student-degrees.entity';
import { UpdateStudentDetailsResponse } from '../types/student/update-student-details-response';
import { HR } from '../hr/hr.entity';
import * as moment from 'moment';
import { ChangeStudentStatusResponse } from '../types/student/change-student-status-response';

@Injectable()
export class StudentService {
  async getStudents(
    status: number,
  ): Promise<Omit<OneStudentResponse, 'degrees'>[]> {
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
      },
      where: {
        status,
      },
    });
  }

  async getOneAvailableStudents(id: string): Promise<OneStudentResponse> {
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
        degrees: {
          courseCompletion: true,
          courseEngagement: true,
          projectDegree: true,
          teamProjectDegree: true,
          bonusProjectUrls: true,
        },
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

  async getSingleStudentFullDetails(
    id: string,
  ): Promise<GetSingleStudentFullDetailsResponse> {
    const student = await Student.findOneOrFail({
      where: {
        isActive: true,
        id,
      },
      relations: ['degrees'],
    });
    if (student.degrees !== null) {
      const { activationToken, id, ...rest } = student.degrees;
      (student as GetSingleStudentFullDetailsResponse).degrees = rest;
    }
  }
        async editStudentDetails(
          id: string,
          studentData: UpdateStudentDetailsDto,
      ): Promise<UpdateStudentDetailsResponse> {
          const student = await Student.findOneOrFail({
            where: { id },
            relations: ['degrees'],
          });
        if ( student.degrees !== null ) {
          await StudentDegrees.update(student.degrees.id, {
            bonusProjectUrls: studentData.bonusProjectUrls,
          });
        }
        const partialStudentData = { ...studentData };
        delete partialStudentData.bonusProjectUrls;
        await Student.update(id, partialStudentData);

        if (student.degrees !== null) {
          await StudentDegrees.update(student.degrees.id, {
            bonusProjectUrls: studentData.bonusProjectUrls,
          });
        }
          return student;
        }
        async scheduleStudent(
          id: string,
          hrId: string,
      ): Promise<ChangeStudentStatusResponse> {
          const student = await Student.findOneOrFail({
            where: { id, isActive: true },
            relations: ['hr'],
          });

          if ( student.status !== StudentStatus.available || student.hr !== null ) {
          throw new BadRequestException('Only available student may be scheduled');
        }

        const hr = await HR.findOneOrFail({
          where: { hrId },
        });

        student.status = StudentStatus.awaiting;
        student.scheduledAt = new Date(moment().format('YYYY-MM-DD'));
        student.hr = hr;
        await student.save();

        return {
          status: 'changed',
        };
      }

        async rejectStudent(id: string): Promise<ChangeStudentStatusResponse> {
          const student = await Student.findOneOrFail({
            where: { id, isActive: true },
            relations: ['hr'],
          });

          if ( student.status !== StudentStatus.awaiting || student.hr === null ) {
          throw new BadRequestException('Only a scheduled student may be rejected');
        }

        student.status = StudentStatus.available;
        student.hr = null;
        student.scheduledAt = null;
        await student.save();

        return {
          status: 'changed',
        };
      }

        async hireStudent(id: string): Promise<ChangeStudentStatusResponse> {
          const student = await Student.findOneOrFail({
            where: { id, isActive: true },
            relations: ['hr'],
          });

          if ( student.status !== StudentStatus.awaiting || student.hr === null ) {
          throw new BadRequestException('Only an scheduled student may be hired');
        }

        student.status = StudentStatus.hired;
        student.scheduledAt = null;
        await student.save();

        //@TODO sending email to admin when student was hired

        return {
          status: 'changed',
        };
      }
      }