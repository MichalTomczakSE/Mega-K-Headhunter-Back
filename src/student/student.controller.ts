import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import {
  GetSingleStudentFullDetailsResponse,
  ItemsPerSite,
  OneStudentResponse,
  StudentsListResponse,
  StudentStatus
} from '../types';
import { UpdateStudentDetailsDto } from './dto/update-student-details.dto';
import { UpdateStudentDetailsResponse } from '../types/student/update-student-details-response';
import { CheckUniquePropertiesGuard } from '../guards/check-unique-properties.guard';
import { ChangeStudentStatusResponse } from '../types/student/change-student-status-response';
import { CheckScheduledStudentsLimitGuard } from '../guards/check-scheduled-students-limit.guard';
import {ApiAcceptedResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(@Inject(StudentService) private studentService: StudentService) {}

  @Get('/available-students')
  @ApiOkResponse({ description: 'List of available students', type: StudentsListResponse,})
  async getAvailableStudents(
      @Query(
          'itemsPerSite',
          new DefaultValuePipe(10),
          ParseIntPipe,
          new ParseEnumPipe(ItemsPerSite),
      )
          itemsPerSite: ItemsPerSite,
      @Query('pageNo', new DefaultValuePipe(1), ParseIntPipe) pageNO: number,
      @Query('city', new DefaultValuePipe('')) city: string,
  ): Promise<StudentsListResponse> {
    return await this.studentService.getStudents(
        StudentStatus.available,
        itemsPerSite,
        pageNO,
        city,
    );
  }

  @Get('/available-students/:id')
  @ApiOkResponse({ description: 'One avaiable student', type: OneStudentResponse,})
  async getOneAvailableStudent(
    @Param('id') id: string,
  ): Promise<OneStudentResponse> {
    return this.studentService.getOneAvailableStudents(id);
  }

  @Put('/schedule/:studentId')
  @ApiCreatedResponse({ description: 'Schedule student by Id' })
  @ApiBadRequestResponse({
    description: 'Only available student may be scheduled',
  })
  @UseGuards(CheckScheduledStudentsLimitGuard)
  async scheduleStudent(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Body('hrId') hrId: string,
  ): Promise<ChangeStudentStatusResponse> {
    return this.studentService.scheduleStudent(studentId, hrId);
  }

  @Put('/reject/:studentId')
  @ApiCreatedResponse({ description: 'Reject student by Id',})
  @ApiBadRequestResponse({
    description: 'Only a scheduled student may be rejected',
  })
  async rejectStudent(
      @Param('studentId', ParseUUIDPipe) studentId: string,
  ): Promise<ChangeStudentStatusResponse> {
    return this.studentService.rejectStudent(studentId);
  }

  @Get('/awaiting-students')
  @ApiOkResponse({ description: 'Awaiting students list' })
  async getAwaitingStudents(
      @Query(
          'itemsPerSite',
          new DefaultValuePipe(10),
          ParseIntPipe,
          new ParseEnumPipe(ItemsPerSite),
      )
          itemsPerSite: ItemsPerSite,
      @Query('pageNo', new DefaultValuePipe(1), ParseIntPipe) pageNO: number,
      @Query('city', new DefaultValuePipe('')) city: string,
  ): Promise<StudentsListResponse> {
    return await this.studentService.getStudents(
        StudentStatus.awaiting,
        itemsPerSite,
        pageNO,
        city,
    );
  }

  @Get('/hired-students')
  async getHiredStudents(
      @Query(
          'itemsPerSite',
          new DefaultValuePipe(10),
          ParseIntPipe,
          new ParseEnumPipe(ItemsPerSite),
      )
          itemsPerSite: ItemsPerSite,
      @Query('pageNo', new DefaultValuePipe(1), ParseIntPipe) pageNO: number,
      @Query('city') city: string,
  ): Promise<StudentsListResponse> {
    return await this.studentService.getStudents(
        StudentStatus.hired,
        itemsPerSite,
        pageNO,
        city,
    );
  }

  @Put('/hire/:studentId')
  async hireStudent(
    @Param('studentId', ParseUUIDPipe) studentId: string,
  ): Promise<ChangeStudentStatusResponse> {
    return this.studentService.hireStudent(studentId);
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
    @Param('id', ParseUUIDPipe) id: string,
    @Body() studentData: UpdateStudentDetailsDto,
  ): Promise<UpdateStudentDetailsResponse> {
    return this.studentService.editStudentDetails(id, studentData);
  }
}
