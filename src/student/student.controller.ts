import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { StudentService } from "./student.service";
import { GetSingleStudentFullDetailsResponse } from "../types";
import { UpdateStudentDetailsDto } from "./dto/update-student-details.dto";
import { UpdateStudentDetailsResponse } from "../types/student/update-student-details-response";

@Controller('student')
export class StudentController {

    constructor(
        @Inject(StudentService) private studentService: StudentService) {
    }

    @Get('/:id')
    getSingleStudentFullDetails(
        @Param('id') id: string,
    ): Promise<GetSingleStudentFullDetailsResponse> {
        return this.studentService.getSingleStudentFullDetails(id);
    }

    @Put('/:id')
    editStudentDetails(
        @Param('id') id: string,
        @Body() studentData: UpdateStudentDetailsDto,
    ): Promise<UpdateStudentDetailsResponse> {
        return this.studentService.editStudentDetails(id, studentData);
    }

}
