import { Injectable } from '@nestjs/common';
import { Student } from "./student.entity";
import { GetSingleStudentFullDetailsResponse, GradingScale, OneStudentResponse } from "../types";
import { UpdateStudentDetailsDto } from "./dto/update-student-details.dto";
import { StudentDegrees } from "./student-degrees.entity";
import { UpdateStudentDetailsResponse } from "../types/student/update-student-details-response";


@Injectable()
export class StudentService {

    async getStudents(status: number): Promise<Omit<OneStudentResponse, "degrees">[]> {
        return await Student.find({
          select: {
            id: true,
            firstName: true,
            lastName: true,
            expectedTypeWork: true,
            targetWorkCity: true,
            expectedSalary: true,
            canTakeApprenticeship: true,
            workExperience: true
          }, where: {
            status
          }
        });
      }
    
    async getOneAvailableStudents(id: string): Promise<OneStudentResponse> {
    
        return await Student.findOne({
          select:
            {
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
              }
            },
          relations: {
            degrees: {}
          },
          where: {
            status: 1,
            id
          }
        });
      }

    async getSingleStudentFullDetails(id: string): Promise<GetSingleStudentFullDetailsResponse> {
        const student = await Student.findOneOrFail({
            where: {
                isActive: true,
                id,
            },
            relations: ['degrees'],
        })
        if ( student.degrees !== null ) {
            const { activationToken, id, ...rest } = student.degrees;
            (student as GetSingleStudentFullDetailsResponse).degrees = rest
        }

        return student;
    }

    async editStudentDetails(id: string, studentData: UpdateStudentDetailsDto): Promise<UpdateStudentDetailsResponse> {
        const student = await Student.findOneOrFail({
            where: { id },
            relations: ['degrees']
        });

        const partialStudentData = { ...studentData };
        delete partialStudentData.bonusProjectUrls;
        await Student.update(id, partialStudentData);

        if ( student.degrees !== null ) {
            await StudentDegrees.update(student.degrees.id, {
                bonusProjectUrls: studentData.bonusProjectUrls,
            })
        }

        return {
            status: 'changed',
        };
    }

}
