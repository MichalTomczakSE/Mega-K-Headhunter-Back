import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import {
  GetSingleStudentFullDetailsResponse,
  OneStudentResponse,
  StudentStatus,
} from '../types';
import { UpdateStudentDetailsDto } from './dto/update-student-details.dto';
import { UpdateStudentDetailsResponse } from '../types/student/update-student-details-response';
import { CheckUniquePropertiesGuard } from '../guards/check-unique-properties.guard';

@Controller('student')
export class StudentController {
  constructor(@Inject(StudentService) private studentService: StudentService) {}

  @Get('/available-students')
  async getAvailableStudents(): Promise<Omit<OneStudentResponse, 'degrees'>[]> {
    return await this.studentService.getStudents(StudentStatus.available);
  }

  @Get('/awaiting-students')
  async getAwaitingStudents(): Promise<Omit<OneStudentResponse, 'degrees'>[]> {
    return await this.studentService.getStudents(StudentStatus.awaiting);
  }

  @Get('/hired-students')
  async getHiredStudents(): Promise<Omit<OneStudentResponse, 'degrees'>[]> {
    return await this.studentService.getStudents(StudentStatus.hired);
  }

  @Get('/available-students/:id')
  async getOneAvailableStudent(
    @Param('id') id: string,
  ): Promise<OneStudentResponse> {
    return this.studentService.getOneAvailableStudents(id);
  }

  @Get('/:id')
  getSingleStudentFullDetails(
    @Param('id') id: string,
  ): Promise<GetSingleStudentFullDetailsResponse> {
    return this.studentService.getSingleStudentFullDetails(id);
  }

  @Put('/:id')
  @UseGuards(CheckUniquePropertiesGuard)
  editStudentDetails(
    @Param('id') id: string,
    @Body() studentData: UpdateStudentDetailsDto,
  ): Promise<UpdateStudentDetailsResponse> {
    return this.studentService.editStudentDetails(id, studentData);
  }
}
