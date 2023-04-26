import { Injectable } from '@nestjs/common';
import { Student } from "./student.entity";
import { GetSingleStudentFullDetailsResponse } from "../types";
import { UpdateStudentDetailsDto } from "./dto/update-student-details.dto";
import { StudentDegrees } from "./student-degrees.entity";
import { UpdateStudentDetailsResponse } from "../types/student/update-student-details-response";

@Injectable()
export class StudentService {

    async getSingleStudentFullDetails(id: string): Promise<GetSingleStudentFullDetailsResponse> {
        const student = await Student.findOneOrFail({
            where: {
                isActive: true,
                id,
            },
            relations: ['degrees'],
        })
        if ( student.degrees !== null ) {
            delete student.degrees.activationToken;
        }

        return student;
    }

    async editStudentDetails(id: string, studentData: UpdateStudentDetailsDto): Promise<UpdateStudentDetailsResponse> {
        const student = await this.getSingleStudentFullDetails(id);

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
        }
    }
}
